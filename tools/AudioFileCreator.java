import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.text.Normalizer;

public class AudioFileCreator {
    public static void main(String[] args) {
        // Pfad relativ zum aktuellen Verzeichnis: eine Ebene hoch, dann in public/...
        Path pfad = Paths.get( "public", "data", "fr", "en-basics.json").normalize();

        try {
            if (!Files.exists(pfad)) {
                System.err.println("Datei nicht gefunden unter: " + pfad.toAbsolutePath());
                return;
            }

            String inhalt = Files.readString(pfad);

            // KORREKT: Pattern.compile statt Pattern.collect
            Pattern pattern = Pattern.compile("\"foreign\"\\s*:\\s*\"([^\"]+)\"");
            Matcher matcher = pattern.matcher(inhalt);

            HttpClient client = HttpClient.newHttpClient();

            System.out.println("Lese Datei: " + pfad);
            System.out.println("Gefundene 'foreign' Einträge:");
            System.out.println("---------------------------------");

            boolean gefunden = false;
            while (matcher.find()) {
                String foreignText = matcher.group(1);
                System.out.println("-> " + matcher.group(1));
                gefunden = true;

                // 1. Akzente entfernen (z.B. "garçon" -> "garcon")
                String ohneAkzente = Normalizer.normalize(foreignText, Normalizer.Form.NFD)
                        .replaceAll("\\p{M}", "");

                // 2. Alles zu Kleinschreibung und Sonderzeichen durch Unterstrich ersetzen
                String dateiName = ohneAkzente.toLowerCase()
                        .replaceAll("[^a-z0-9]", "_")
                        .replaceAll("_+", "_") // Doppelte Unterstriche vermeiden
                        + ".wav";
                Path audioDatei = pfad.getParent().resolve(dateiName);

                System.out.println("Verarbeite: " + foreignText + " -> " + audioDatei.getFileName());

                String jsonBody = String.format(
                        "{\"model\": \"voice-fr-siwis-low\", \"backend\": \"piper\", \"input\": \"%s\"}",
                        foreignText
                );

                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create("http://localhost:8080/tts"))
                        .header("Content-Type", "application/json")
                        .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                        .build();

                try {
                    // Wir erwarten ein Byte-Array (Audio) als Antwort
                    HttpResponse<byte[]> response = client.send(request, HttpResponse.BodyHandlers.ofByteArray());

                    if (response.statusCode() == 200) {
                        Files.write(audioDatei, response.body());
                        System.out.println("  [OK] Gespeichert.");
                    } else {
                        System.err.println("  [Fehler] Server meldet Status: " + response.statusCode());
                    }
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    break;
                }
            }

            if (!gefunden) {
                System.out.println("Keine Einträge mit dem Schlüssel 'foreign' gefunden.");
            }

        } catch (IOException e) {
            System.err.println("Fehler beim Lesen der Datei: " + e.getMessage());
        }
    }

    public String normalizeText(String text) {
        // 1. Zerlegt Zeichen wie 'é' in 'e' + '´' (NFD Normalisierung)
        String nfdNormalizedString = Normalizer.normalize(text, Normalizer.Form.NFD);

        // 2. Entfernt alle Akzent-Symbole mittels Regex (Unicode Kategorie "M" für Marks)
        return nfdNormalizedString.replaceAll("\\p{M}", "");
    }
}
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
        Path jsonPfad = Paths.get("public", "data", "fr", "en-basics.json").normalize();
        Path zielOrdner = jsonPfad.getParent();

        if (!Files.exists(jsonPfad)) {
            System.err.println("Datei nicht gefunden: " + jsonPfad.toAbsolutePath());
            return;
        }

        try {
            String inhalt = Files.readString(jsonPfad);
            // Wir suchen nach den Objekten im Array
            Pattern pattern = Pattern.compile("\\{\\s*\"foreign\"\\s*:\\s*\"([^\"]+)\"");
            Matcher matcher = pattern.matcher(inhalt);

            StringBuilder neuerInhalt = new StringBuilder();
            HttpClient client = HttpClient.newHttpClient();
            int lastEnd = 0;

            System.out.println("Verarbeite Vokabeln...");

            while (matcher.find()) {
                // Text vor dem Treffer anfügen
                neuerInhalt.append(inhalt, lastEnd, matcher.end());

                String originalText = matcher.group(1);

                // 1. Dateinamen generieren (ASCII safe)
                String safeName = Normalizer.normalize(originalText, Normalizer.Form.NFD)
                        .replaceAll("\\p{M}", "")
                        .toLowerCase()
                        .replaceAll("[^a-z0-9]", "_")
                        .replaceAll("_+", "_");
                String dateiName = safeName + ".wav";

                // 2. Audio-Request (TTS)
                bearbeiteAudio(client, originalText, zielOrdner.resolve(dateiName));

                // 3. Das neue URL-Attribut in den JSON-String einfügen
                // Wir fügen es direkt nach dem "foreign": "..." Feld ein
                neuerInhalt.append("\n      \"audio\": \"").append(dateiName).append("\",");

                // Merken, wo wir im Original-String stehen (hinter dem schließenden Anführungszeichen von foreign)
                lastEnd = matcher.end() + 1;
            }

            // Rest der Datei anfügen
            neuerInhalt.append(inhalt.substring(lastEnd));

            // 4. Datei überschreiben
            Files.writeString(jsonPfad, neuerInhalt.toString());
            System.out.println("---------------------------------");
            System.out.println("JSON-Datei erfolgreich aktualisiert!");

        } catch (IOException e) {
            System.err.println("Fehler: " + e.getMessage());
        }
    }

    private static void bearbeiteAudio(HttpClient client, String text, Path zielPfad) {
        String jsonBody = String.format(
                "{\"model\": \"voice-fr-siwis-low\", \"backend\": \"piper\", \"input\": \"%s\"}",
                text
        );

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:8080/tts"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .build();

        try {
            HttpResponse<byte[]> response = client.send(request, HttpResponse.BodyHandlers.ofByteArray());
            if (response.statusCode() == 200) {
                Files.write(zielPfad, response.body());
                System.out.println("  [Audio OK] " + zielPfad.getFileName());
            } else {
                System.err.println("  [Fehler] Server-Status: " + response.statusCode());
            }
        } catch (Exception e) {
            System.err.println("  [Fehler] Request fehlgeschlagen: " + e.getMessage());
        }
    }
}
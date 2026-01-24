Define Emits:
```
const emit = defineEmits<{
    (e: 'm-next' payload: { id: number; note?: string }): void
    (e: 'm-swap' payload: { id: number; note?: string }): void
}>()
```

```
const emit = defineEmits(['m-next', 'm-swap'])
```
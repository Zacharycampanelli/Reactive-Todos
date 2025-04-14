// Fix for missing NoInfer type in Headless UI
type NoInfer<T> = [T][T extends any ? 0 : never];
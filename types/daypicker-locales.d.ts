// This project uses TypeScript's legacy Node resolver, which does not read
// DayPicker's locale subpath export. Keep the used exports strongly typed.
declare module "@daypicker/react/locale" {
  export const enGB: import("@daypicker/react").DayPickerLocale;
  export const zhCN: import("@daypicker/react").DayPickerLocale;
  export const ko: import("@daypicker/react").DayPickerLocale;
  export const es: import("@daypicker/react").DayPickerLocale;
}

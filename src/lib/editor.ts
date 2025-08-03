import { Extension } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { php } from "@codemirror/lang-php";
import { json } from "@codemirror/lang-json";

export type LanguageKey =
    | "js"
    | "ts"
    | "jsx"
    | "tsx"
    | "java"
    | "py"
    | "c"
    | "cpp"
    | "html"
    | "css"
    | "php"
    | "json";

export const languageMap: Record<string, Extension> = {
    js: javascript(),
    ts: javascript({ typescript: true }),
    jsx: javascript({ jsx: true }),
    tsx: javascript({ typescript: true, jsx: true }),
    java: java(),
    py: python(),
    c: cpp(),
    cpp: cpp(),
    html: html(),
    css: css(),
    php: php(),
    json: json(),
};

export const languageNames = {
    js: "JavaScript",
    ts: "TypeScript",
    jsx: "JSX",
    tsx: "TSX",
    java: "Java",
    py: "Python",
    c: "C",
    cpp: "C++",
    html: "HTML",
    css: "CSS",
    php: "PHP",
    json: "JSON",
};

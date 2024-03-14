sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: [{content: "k", date: "2024-03-14T12:23:37.579Z"}, ... ]
    deactivate server

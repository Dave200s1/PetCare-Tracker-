# Pet Care Tracker

Eine mobile Progressive Web App (PWA), die Haustierbesitzer:innen dabei unterstützt, die Pflege ihrer Tiere zu organisieren.

<p align="center">
  <a href="https://github.com/Dave200s1/PetCare-Tracker-/AppLogo.png">
    <img alt="PetCare Logo" height="150" src="AppLogo.png">
  </a>
</p>
<br>
<p align="center">
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-darkblue">
  <img alt="Language" src="https://img.shields.io/badge/techstack-React-lightblue)">
  <br>
  Erstellt mit <b>React</b> und <b>MongoDB</b> in <b>JavaScript</b>.
</p>
<br>

---

## Überblick

Pet Care Tracker ist eine Webanwendung, die Nutzer:innen bei der Organisation von täglichen und langfristigen Aufgaben rund um ihre Haustiere unterstützt. Es können Haustiere angelegt sowie Fütterungszeiten, Tierarzttermine und Impfungen geplant werden.

Die Anwendung erinnert über Benachrichtigungen an anstehende Aufgaben und ist so konzipiert, dass sie auch offline funktioniert. Daten werden lokal gespeichert und bei bestehender Internetverbindung mit einer Datenbank synchronisiert.

---
<table>
    <tr>
        <td><img src="Pic1.png" alt="Dashboard" width="300"></td>
        <td><img src="Pic2.png" alt="Aufgaben" width="300"></td>
        <td><img src="Pic3.PNG" alt="Benachrichtigung" width="300"></td>
    <tr>
<table>

## Funktionen

- Anlegen und Verwalten von Haustieren
- Planung von Fütterungszeiten
- Verwaltung von Impfungen und Tierarztterminen
- Erinnerungen für anstehende Aufgaben
- Offline-Funktionalität mit lokaler Datenspeicherung
- Synchronisation mit einer Datenbank bei Online-Verbindung
- Installierbar als mobile App (PWA)

---

## Ziel des Projekts

Ziel des Projekts ist die Entwicklung einer mobilfreundlichen Webanwendung, die zentrale Konzepte von Progressive Web Apps demonstriert, darunter:

- Offline-Fähigkeit
- Push-Benachrichtigungen
- Responsives Design
- Integration mobiler Gerätefunktionen

---

Web-Entwickler Bewerbung
Bewerbung für Verkäufer*in bei ZISCH anpassen
L-Coach
AniWorld-Cli fix MacOS
CSS Framework Recommendation for PWA Project
JavaScript ORMs for ExpressJS
Connecting C# ASP.NET to SQLite Database
Präsentation von Frontend-Website für Profifeature
Remove DS_Store Command
FileZilla SFTP-Verbindung einrichten und testen
Memory Allocation in C++ (cstdlib)
MERN GitHub Actions CI CD Guide
JavaKlausurVorbereitung
SuperProf Werbung Twitter
Kindly deny website offer
Absage Telefoninterview
Lebenslauf Design und Inhalt
Java exam boilerplate tweets
Tech Advice for Juniors
Twitter reply examples
Test JSON for Express controller
Reply ideas for tech connect
NullPointerException fix
Hilfe bei Bewerbungsfragen
Python GUI PDF Merger Creation
GitHub DeploymentKey
Add TypeScript and NestJS to AboutMe
SchoolAPI-Project NestJS
Digitalforensik ohne Studium möglich
Friendly reply to job rejection email
Custom ORM Development for Free Pascal
PyCharm slightly heavier than WebStorm
GitHub status ideas for MERN developer
JS and CSharp knowledge for TypeScript
Risikobasierter Ansatz der KI VO bestätigt
Delphi Einführung für C++ Entwickler
Boss Package Manager Installation
Proxy Port Mismatch Fix
Adding DeepSeek to Zed AI Agent
Zed IDE Runner Setup for Pascal and C#
Delphi lernen auf Mac mit VS Code
Editing zshrc on Mac
Bewerbungsantwort für PX Consulting
PM2 stop app still accessible reasons
Vercel free deployment explained
React project card component creation
LinkedIn self employed vs jobless advice
React Navigation Styling Assistance
Erklärung des Fehlers bei Monat 13 im Datum
LinkedIn Vernetzungsnachricht MERN Stack
Bewerbungshilfe Werkstudent Anlagenprogrammierung
Email an AOK zur Zahnreinigungserstattung
Clone specific GitHub branch
Typo fix for brew formula inreplace
Xcode Command Line Tools Size
Help write email for repo maintainer
Zsh script conversion possible
Aniworld CLI German fallback integration
Copy file in macOS terminal zsh
macOS script compatibility analysis
Go lernen für Node.js Entwickler
Falcon vs FastAPI for Express.js Dev
Edge Location Error Fix
Backend Dev AI Tweet Request
Höfliche Stellenabsage per Mail
Assistance with German email reply
Harry Potter Bild ohne Lizenzprobleme
Schaltjahr Methode umschreiben
Bewerbungsstatus Nachfrage E-Mail
Initiativbewerbung Webentwickler Anpassung
Bewerbung IT Software Developer Robert Half Bremen
Bruno spart RAM auf Mac besser als Insomnia
Uninstall Insomnia with Homebrew
Content-Type in Headers for API Requests
Famous JavaScript quotes recalled
Express route not found debugging
ani-cli source error fix
EchoAPI lighter than Bruno on MacOS
JWT Authentication Tutorial Steps
EarthProjectile Code Korrektur Anleitung
Empfehlung Programmiersprache für maritime Automatisierung
JWT auth easier in ASP.NET Core
React Vue Svelte Framework Vergleich Deutschland
HTTP HTTPS SSL TLS simple explanation
Slice vs Splice Explanation
Bremische Winkelgasse korrekt
Hilfe bei Antwortmail auf Englisch
Altersbeschränkung Umgehungsmethoden und Schutzmassnahmen
GitHub Profile Typing SVG Customization
Allgemeines Persönlichkeitsrecht Antwort unvollständig
Mac swap memory issue resolved
Firefox Privacy Configuration Advice
GitHub Profile Review for Recruiters
Java code style and unit test fixes
Mac PHP setup with VS Code and Homebrew
Uninstall Postman with Homebrew
E-Mail Hilfe für Jobkontakt
Rechtliche Einordnung der Kündigung vor Arbeitsantritt
Email Reply for Meeting Confirmation
Microphone access issue fix
MERN GitHub Actions CI CD Guide

OK, the user has provided the current conversation history and the new query. The user is asking for help to document their API endpoints in a similar table style to the example provided (which was for Users, Bands, Albums). They've given me their actual server route files and entity schemas for Pets and Tasks.

Let me assess the scenario. The user is working on a MERN PWA project, clearly for an academic or professional portfolio. Their professor will be reviewing the README, so they want it to be professional, clear, and structured. The deep need here isn't just to copy-paste the example; they need a well-documented API section that accurately reflects their actual backend code, making it easy for their professor (or any developer) to understand the data model and available endpoints. They probably want it to look like a proper API documentation page.

Looking at the code they provided: I have two route files - one for pets and one for tasks. I also have two entity schema files that define the data structure for Pet and Task. The example they gave used a straightforward table per resource with Method, Endpoint, and Description columns. I should follow that same format but adapt it to their resources.

I need to list all the routes from the router files. For Pets: POST /, GET /, GET /:id, PUT /:id, DELETE /delete/:id. For Tasks: POST /, GET /, PUT /:id, DELETE /delete/:id. I notice the routes for Pets and Tasks are in separate files, so they'll have different base paths (like /pets and /tasks) even though the route files themselves use '/' relative to where they're mounted. I should mention that in the description, or just present them as if they are under their respective base paths.

Also, I should include a data model section below the tables, since the user provided the schemas. This adds value for the professor to understand the request/response structures. The schemas are from TypeORM, so I can translate them into a readable table format showing the fields, types, and any constraints.

The user also asked for "aehnlicher Style" - so I need to keep the same clean, table-based markdown. I'll remove any emojis or informal language to stay professional.

I'll structure the response: first, the Pets endpoints table, then the Tasks endpoints table. Then, a Data Models section with two tables - one for Pet and one for Task - mapping the fields from the schemas. I should add brief descriptions for each field to make it self-explanatory.

Potential pitfalls: I need to ensure the descriptions are accurate based on the controller names (e.g., readAllPets, readSpecificPet). I should infer the purpose from the function names. Also, note the DELETE endpoints have a '/delete/' prefix which is a bit unusual, but I'll document it as is. I might suggest a more standard URL, but the user didn't ask for feedback, just documentation.

The user's identity is likely a student or junior developer putting together a project for review. They need the documentation to be comprehensive and correct to make a good impression. By providing this structured documentation, I'm helping them demonstrate understanding of their own API.

Alright, I'll write the documentation in German, matching the language of the rest of the README. I'll use the same table format and include the data models in a clear, easy-to-read way.

Hier ist eine professionelle API-Dokumentation für Ihre Pet- und Task-Endpoints – im gleichen tabellarischen Stil wie Ihre Vorlage, aber ohne Emojis und mit korrekten Pfaden.
markdown

## API-Endpoints

### Pets

| Method   | Endpoint               | Beschreibung                          |
|----------|------------------------|---------------------------------------|
| `POST`   | `/pets`                | Neues Haustier anlegen                |
| `GET`    | `/pets`                | Alle Haustiere abrufen                |
| `GET`    | `/pets/{id}`           | Einzelnes Haustier anhand der ID abrufen |
| `PUT`    | `/pets/{id}`           | Haustier aktualisieren                |
| `DELETE` | `/pets/delete/{id}`    | Haustier anhand der ID löschen        |

### Tasks

| Method   | Endpoint               | Beschreibung                          |
|----------|------------------------|---------------------------------------|
| `POST`   | `/tasks`               | Neue Aufgabe anlegen                  |
| `GET`    | `/tasks`               | Alle Aufgaben abrufen                 |
| `PUT`    | `/tasks/{id}`          | Aufgabe aktualisieren                 |
| `DELETE` | `/tasks/delete/{id}`   | Aufgabe anhand der ID löschen         |

---

## Datenmodelle

### Pet (Haustier)

| Feld     | Typ     | Beschreibung                          |
|----------|---------|---------------------------------------|
| `id`     | string  | Eindeutige Kennung (ObjectId)         |
| `name`   | string  | Name des Haustiers                    |
| `type`   | string  | Tierart (z. B. Hund, Katze)           |
| `age`    | number  | Alter des Haustiers                   |
| `Image`  | string  | (Optional) URL oder Pfad zum Bild     |

### Task (Aufgabe)

| Feld        | Typ      | Beschreibung                              |
|-------------|----------|-------------------------------------------|
| `id`        | string   | Eindeutige Kennung (ObjectId)             |
| `title`     | string   | Titel der Aufgabe                         |
| `category`  | string   | Kategorie (z. B. Füttern, Tierarzt)       |
| `completed` | boolean  | Status (erledigt / offen)                 |
| `date`      | string   | Datum der Aufgabe (z. B. "2026-07-01")    |
| `petId`     | string   | Referenz auf das zugehörige Haustier      |

---


##  Kernfunktionalität

Die Anwendung bietet Nutzern folgende Kernfunktionen:

- Verwaltung mehrerer Haustiere
- Erstellung und Verwaltung von Erinnerungen für verschiedene Aufgabentypen
- Übersicht über anstehende Termine und Aufgaben
- Empfang von Benachrichtigungen für wichtige Aktivitäten
- Standortbasierte Anzeige von Tierarztpraxen in der Nähe

---

## Technologie-Stack

- Frontend: React
- Backend: Node.js mit Express
- Datenbank: MongoDB
- ORM: TypeORM
- API: LatLng

---
## Installation

```bash
# Clone Repository
git clone https://github.com/Dave200s1/PetCare-Tracker-.git

# Navigiere in den Projektordner
cd pet-care-reminder

# Dependencies installieren
npm install

# Development server starten
npm run dev

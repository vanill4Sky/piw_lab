# Lab 5 React.js

_Tematem tego laboratorium będzie zapoznanie się z biblioteką React.js. Wszelkie materiały wraz z poradnikami znajdują się na stronie oficjalnej dokumentacji._

- [Lab 5 React.js](#lab-5-reactjs)
  - [Przygotowanie:](#przygotowanie)
  - [Forma oddania:](#forma-oddania)
  - [1. Strona powitalna, komponenty i właściwości](#1-strona-powitalna-komponenty-i-właściwości)
  - [2. Przyciski, formularze i zdarzenia](#2-przyciski-formularze-i-zdarzenia)
  - [3. Komponent listy](#3-komponent-listy)
  - [4. Portal WWW z wykorzystaniem biblioteki React.js](#4-portal-www-z-wykorzystaniem-biblioteki-reactjs)

## Przygotowanie:
Podczas rozwiązywania poniższych zadań można wykorzystać menadżer pakietów npm (patrz: wersja zalecana), jednak możliwe jest zastosowanie bibliotek ręcznie (patrz: wersja alternatywna).
Uwaga: należy wybrać dokładnie jedną wersję przygotowania środowiska.  

**Wersja zalecana:**  
Zainstaluj menadżer pakietów npm korzystając instalatora Node.js: Pobierz Node.js oraz zapoznaj się z instrukcją utworzenia szablonowej aplikacji z użyciem biblioteki React: [Instrukcja tworzenia aplikacji React](https://create-react-app.dev/docs/getting-started/) 

**Wersja alternatywna:**  
Ta wersja obejmuje zastosowanie samodzielnie wybranych narzędzi.
Adresy URL do kodu źródłowego modułów biblioteki React niezbędnych do wykonania tej instrukcji.
- https://unpkg.com/react@16.0.0/umd/react.production.min.js
- https://unpkg.com/react-dom@16.0.0/umd/react-dom.production.min.js
- https://unpkg.com/react-router-dom/umd/react-router-dom.min.js

## Forma oddania: 
- plik zip z kodem strony,
- link do dostępnej publicznie strony z rozwiązaniem zadań lub docker do uruchomienia na komputerze prowadzącego (tak jak w zadaniu poprzednim),
- wysłany do prowadzącego mailem z tytułem zawierającym [PIW] i grupę zajęć np. [11/P],
- termin (do 12 dni po terminie zajęć):  30.05/6.06  (zależy od parzystości grupy: N lub P).

## 1. Strona powitalna, komponenty i właściwości
Zaprojektuj stronę powitalną w formie komponentu.  
Strona powitalna powinna zawierać co najmniej:
- tytuł,
- krótki opis strony,
- przykładowe logo.

Podany tytuł wyświetlany na podstronie powinien być podawany do komponentu poprzez właściwości (props).  
[React Docs: Wprowadzenie do JSX](https://pl.reactjs.org/docs/introducing-jsx.html)  
[React Docs: Komponenty i właściwości](https://pl.reactjs.org/docs/components-and-props.html)

## 2. Przyciski, formularze i zdarzenia
Utwórz komponent przycisku oraz funkcję, która zostanie wywołana po jego kliknięciu.
Przycisk powinien zmieniać zmienną boolowską na zasadzie toggle.
Zawartość strony powinna być zależna od wartości tej zmiennej (np. wyświetlać jakiś element tylko gdy zmienna ma wartość true).
Komponent przycisku musi być wyświetlany niezależnie od wartości zmiennej.  
[React Docs: Obsługa zdarzeń](https://pl.reactjs.org/docs/handling-events.html)  
[React Docs: Renderowanie warunkowe](https://pl.reactjs.org/docs/conditional-rendering.html)

 
## 3. Komponent listy
Utwórz nowy komponent w którym wylistujesz elementy znajdujące się w przygotowanej przez siebie tablicy (o dowolnej zawartości).

- Reprezentacja graficzna powinna być taka sama dla wszystkich elementów tablicy.
- Implementacja ma być niezależna od liczby elementów kolekcji.
- Należy zadbać o unikalny klucz (właściwość key) dla każdego listowanego elementu (zobacz poniższy link do dokumentacji).  

[React Docs: Listy i klucze](https://pl.reactjs.org/docs/lists-and-keys.html)

## 4. Portal WWW z wykorzystaniem biblioteki React.js
Przygotować portal WWW o dowolnej tematyce z użyciem biblioteki React. Portal ma się składać z minimum 3 różnych podstron.
Ponadto portal powinien zawierać:
- teksty, elementy graficzne, menu,
- elementy interaktywne wpływające na stan aplikacji (np. formularze i przyciski)
- oraz elementy wyświetlające aktualny stan aplikacji lub takie, których wygląd jest od tego stanu zależny.

Przykładem stanu aplikacji jest wariant językowy portalu lub dane zalogowanego użytkownika.

Podczas wykonywania ćwiczenia należy wykorzystać:

- mechanizm routingu dostarczany przez React.js,
- kontekst zawierający współdzielone między komponentami pola i metody ([React Docs: Kontekst](https://pl.reactjs.org/docs/context.html)),
- oraz co najmniej jedno wystąpienie każdego z następujących hooków (zobacz dokumentację: [React Docs: Hooki](https://pl.reactjs.org/docs/hooks-intro.html)):
  - useState,
  - useEffect
  - oraz jeden [samodzielnie utworzony hook](https://pl.reactjs.org/docs/hooks-custom.html).
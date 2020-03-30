# Lab 2

_Proszę nie wykorzystywać żadnych bibliotek JavaScript, kod ma być napisany samodzielnie używając tylko JavaScriptu.
Nie używamy również **HTML5 Canvas.**_

 - [Forma oddania](#forma-oddania)
 - [1. Wyrażenia regularne](#1-wyra%c5%bcenia-regularne)- [Lab 2](#lab-2)
  - [Forma oddania:](#forma-oddania)
  - [1. Wyrażenia regularne](#1-wyra%c5%bcenia-regularne)
  - [2. Formularze i JavaScript](#2-formularze-i-javascript)
  - [3. Dynamiczna zamiana obrazków pozwalająca m. in. na tworzenie graficznych menu](#3-dynamiczna-zamiana-obrazk%c3%b3w-pozwalaj%c4%85ca-m-in-na-tworzenie-graficznych-menu)
  - [4. Dynamiczne podmienianie obrazów](#4-dynamiczne-podmienianie-obraz%c3%b3w)
  - [5. Własnoręczna animacja](#5-w%c5%82asnor%c4%99czna-animacja)
  - [6. Prosta gra zręcznościowa](#6-prosta-gra-zr%c4%99czno%c5%9bciowa)
  
## Forma oddania: 
- plik zip z kodem strony, plik index.html ma zawierać linki do stron z zadaniami
- link do dostępnej publicznie strony z rozwiązaniem zadań lub docker do uruchomienia na komputerze prowadzącego (tak jak w zadaniu poprzednim) wysłany do prowadzącego mailem z tytułem zawierającym [PIW] i grupę zajęć np. [11/P]
- termin (do 5 dni po terminie zajęć):  4.04 lub 11.04 (zależy od parzystości grupy: P lub N)

## 1. Wyrażenia regularne
Zapoznaj się z użyciem wyrażeń regularnych w JavaScripcie.  

Utwórz formularz pozwalający na wpisanie:
- imienia (tylko litery)
- nazwiska (tylko litery)
- numeru telefonu (format między narodowy +4871233445)
- daty urodzenia (w formacie 10.12.2020) 
- adresu e-mail
- loginu (tylko małe litery - bez cyfr) 
- hasła
- powtórzenia hasła

Kontrola wpisywania ma być zrobiona między innymi przy użyciu wyrażeń regularnych. Po wysłaniu formularza ma się pojawiać informacja (na czerwono) co jest źle (nie w nowym oknie, ale obok pola), a w przypadku gdy jest dobrze  informacjami od użytkownika (w przypadku daty z rozbiciem na poszczególne elementy daty: dzięn miesiąc, rok) gdzieś poniżej formularza (z nagłówkiem na zielono).

## 2. Formularze i JavaScript

Utwórz stronę HTML wyznaczającą pierwiastki równania kwadratowego. 
Użyj do tego formularzy i funkcji JavaScriptu (z kontrolą poprawności danych wejściowych).
- używaj atrybutu ID dla pól tekstowych i formularzy
- pamiętak o konwersja na liczbę (np. Number(co))

 

 

## 3. Dynamiczna zamiana obrazków pozwalająca m. in. na tworzenie graficznych menu 

Napisz skrypt JS zamieniający obrazek (będący odnośnikiem do jakiejś strony) w momencie, gdy kursor znajdzie się nad obrazkiem. 
Wykorzystaj w tym celu obrazki z internetu.

Wskazówki: 
Należy zastosować obsługę zdarzeń: onMouseOver i OnMouseOut dla znacznika \<a>. 

## 4. Dynamiczne podmienianie obrazów

Utworzyć stronę zawierającą przegląd "dziwnych" zwierząt. W spakowanym [pliku](http://www.zsk.iiar.pwr.edu.pl/zsk/repository/podyplomowe/www1/lab8/zad3.zip) znajduje się 10 obrazków zwierząt oraz po 10 tesktów w postaci normalnej (out) i inwersyjnej (over). Używając tych bitmap opracuj własną stronę zawierającą z prawej strony menu wszytskich zwierząt. Po najechaniu myszką (zdarzenie mouseover) na wybraną nazwę: nazwa zmienia się na wersję inwersyjną (over) i po prawej stronie pojawia się odpowiadający nazwie rysunk zwierzęcia. Przykładowy wygląd strony (wersja bez dynamiki): [link](http://www.zsk.iiar.pwr.edu.pl/zsk/repository/podyplomowe/www1/lab8/ex3.gif).

## 5. Własnoręczna animacja

Zrealziuj animację rakiety używając bitmap: [1](http://www.zsk.iiar.pwr.edu.pl/zsk/repository/podyplomowe/java/lab_8/starfield.gif) i [2](http://www.zsk.iiar.pwr.edu.pl/zsk/repository/podyplomowe/java/lab_8/rocketship.gif).
Uwagi, użyj:
- użyj ID dla animowanego obrazka np 'animacja'
- dostęp do obiektu bitmapy: obiekt=document.getElementById('animacja')
- ustawienie wartości początkowych:
    - obiekt.style.top='5px';
    - obiekt.style.left='1px';
    - obiekt.style.position='absolute';
- zmiana położenia w osi x: obiekt=parseInt(obiekt.style.left)+10+'px';
- funkcja opóźnienia czasowego: setTimeout("funkcja()",100)

Zmodyfikuj program, umożliwiając "powrót" rakiety. Użyj [bitmapy](http://www.zsk.iiar.pwr.edu.pl/zsk/repository/podyplomowe/www1/lab9/irocketship.gif).
Dodaj możliwość przyspieszanie/spowalniania poprzec naciśnięcie odpowiednich przyciskóww. 

 

## 6. Prosta gra zręcznościowa

Napisz prostą grę zręcznościową. Propozycja gry:
- na ekranie pojawia się obiekt (np. animowany gif)
- obiekt przemieszcza się losowo
- niech w losowych chwilach czasu prouszany obiekt (rysunek) zmienia się na inny (nazwimy go nieprawidłowy) 
- zadaniem gracza jest kliknąć w poruszany obiekt
- trafienie w poprawny obiekt jest promowane punktami dodatnimi
- natomiast nietrafienie w obiekt lub kliknięcie w  obiekt nieprawidłowy ujemnymi
- punktacja powinna się wyświetlać na bieżąco wraz z upływem czasu
# Lab 4 JavaScript i workery

_Proszę nie wykorzystywać żadnych bibliotek JavaScript, kod ma być napisany samodzielnie używając tylko JavaScriptu._

- [Lab 4 JavaScript i workery](#lab-4-javascript-i-workery)
  - [Forma oddania:](#forma-oddania)
  - [1. Symulacja punktu obsługi](#1-symulacja-punktu-obs%c5%82ugi)
  - [2. Złożone algorytmy](#2-z%c5%82o%c5%bcone-algorytmy)
  
## Forma oddania: 
- plik zip z kodem strony, plik index.html ma zawierać linki do stron z zadaniami (1 i 2 lub 1 i 3)
- link do dostępnej publicznie strony z rozwiązaniem zadań lub docker do uruchomienia na komputerze prowadzącego 
- wysłany do prowadzącego mailem z tytułem zawierającym [PIW] i grupę zajęć np. [11/P]
- termin (do 5 dni po terminie zajęć):  9.05 lub 16.05 (zależy od parzystości grupy: N lub P)

## 1. Symulacja punktu obsługi
Napisać program w JavaScripcie, który wykorzystując kolejkę zwykłą (FIFO) zasymuluje obsługę kolejki klientów przez trzech urzędników (A, B, C).  
Każdy klient w kolejce ma do załatwienia sprawę, która wymaga określonego z góry czasu ti (założyć, że czas ten ma rozkład normlany). Zakłada się, że: - każdy klient trafia na koniec kolejki z czasem „losowym”, w „losowym” momencie (czasu pomiędzy klientami ma rozkład wykładniczy), - klient z czoła kolejki trafia do tego urzędnika, który jest „wolny” (jeśli wielu jest wolnych, decyduje kolejność od A do C). Każdy urzędnik, kolejka i generator klientów  ma być realizowany jako worker. Kolejka ma miec skończoną długość, w przypadku pojawienia się klienta przy maksymalnym rozmiarze kolejki ma być odrzucany.  
Zaimplementuj stosowny algorytm oraz zilustruj jego działanie na ekranie przeglądarki: stan aktulany systemu i stan skumolowany (np. ilość obsłużonych od poczatku, ilośc odczuconych). Pozwól użytkownikowi regulowac parametrami rozkładu i max. długościa  kolejki.

## 2. Złożone algorytmy

Rozwiąż jedno z zadań (w JavaScripcie):

(0) https://app.codility.com/programmers/lessons/90-tasks_from_indeed_prime_2015_challenge/flood_depth/  
(1) https://app.codility.com/programmers/lessons/17-dynamic_programming/min_abs_sum/  
(2) https://app.codility.com/programmers/lessons/91-tasks_from_indeed_prime_2016_challenge/dwarfs_rafting/  
(3) https://app.codility.com/programmers/lessons/91-tasks_from_indeed_prime_2016_challenge/hilbert_maze/  
(4) https://app.codility.com/programmers/lessons/91-tasks_from_indeed_prime_2016_challenge/tree_product/  

Numer zadania to reszta z dzielenia numeru indeksu (nazwa używtkownika w poczcie studenckiej) przez 5.  
Kod należy napisać obiektowo.  
Następnie dodaj funckję do strony html w której można określić rozmiar zadania, wylosować wartości wejściowe i uruchomić funkcję jako worker i przedstawić na ekranie wynik.  
Postęp działania ma być na bieżąco wyświetlany na stronie.  
Do strony należy dołączyć link do strony z codility z  wynikiem uzyskanym w testach z codility (link w stylu: https://app.codility.com/demo/results/trainingXXXXX/  
Strona ma również  zawierać (algorytmicznie i wizualnie) wyliczenie numeru zadania dla numeru indeksu studenta i zawierać link do treści zadania.
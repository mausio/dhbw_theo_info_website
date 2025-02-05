import { Comment } from '../../src/types/comments.types';

export const initialComments: Record<string, Comment[]> = {
  insertionSort: [
    {
      id: '550e8400-e29b-41d4-a716-446655440000',
      text: "Hilfe! 😅 Ich verstehe nicht, warum wir bei Index 1 anfangen und nicht bei 0? Das verwirrt mich total...",
      author: "Sarah",
      authorId: "user1",
      timestamp: new Date('2024-03-20'),
      replies: [
        {
          id: '550e8400-e29b-41d4-a716-446655440001',
          text: "Hey, hatte auch Probleme damit! Stell dir vor, der erste Teil (Index 0) ist wie eine sortierte Karte, die du schon in der Hand hältst. Dann nimmst du eine neue Karte (Index 1) und steckst sie an die richtige Stelle. Das hat mir geholfen! 🃏",
          author: "Markus",
          authorId: "user2",
          timestamp: new Date('2024-03-20'),
          parentId: '550e8400-e29b-41d4-a716-446655440000'
        }
      ]
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      text: "Diese O(n²) Komplexität verwirrt mich... Wieso soll der Algorithmus für kleine Arrays gut sein? Ist Quicksort nicht immer besser? 🤔",
      author: "Alexander",
      authorId: "user3",
      timestamp: new Date('2024-03-19'),
      replies: [
        {
          id: '550e8400-e29b-41d4-a716-446655440003',
          text: "Bei kleinen Arrays ist die theoretische Komplexität gar nicht so wichtig! InsertionSort macht weniger Vertauschungen als Quicksort und ist super simpel. Außerdem ist er mega schnell, wenn die Daten schon fast sortiert sind! 👍",
          author: "David",
          authorId: "user4",
          timestamp: new Date('2024-03-19'),
          parentId: '550e8400-e29b-41d4-a716-446655440002'
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440004',
          text: "Stimmt! In der Praxis wird InsertionSort sogar innerhalb von Quicksort benutzt, wenn die Teilarrays klein genug sind (so 10-20 Elemente). Hab ich auch erst letztens gelernt! 🤓",
          author: "Emma",
          authorId: "user5",
          timestamp: new Date('2024-03-19'),
          parentId: '550e8400-e29b-41d4-a716-446655440002'
        }
      ]
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440005',
      text: "Was bedeutet das, wenn die sagen 'InsertionSort ist adaptiv'? Versteh nur Bahnhof... 😅",
      author: "Thomas",
      authorId: "user8",
      timestamp: new Date('2024-03-17'),
      replies: [
        {
          id: '550e8400-e29b-41d4-a716-446655440006',
          text: "Adaptiv heißt, dass er besser wird, wenn die Daten schon teilweise sortiert sind! Dann muss er nicht so viel verschieben und wird fast linear schnell. Hat mir der Tutor letzte Woche erklärt 😊",
          author: "Anna",
          authorId: "user9",
          timestamp: new Date('2024-03-17'),
          parentId: '550e8400-e29b-41d4-a716-446655440005'
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440007',
          text: "Ein gutes Beispiel: Wenn du eine sortierte Liste hast und nur ab und zu was Neues einfügst, ist InsertionSort perfekt! Viel besser als alles neu zu sortieren 💪",
          author: "Maja",
          authorId: "user10",
          timestamp: new Date('2024-03-17'),
          parentId: '550e8400-e29b-41d4-a716-446655440005'
        }
      ]
    }
  ],
  heapSort: [
    {
      id: '550e8400-e29b-41d4-a716-446655440010',
      text: "Okay, ich gebe auf 😭 Was zur Hölle ist ein Max-Heap und warum brauchen wir den überhaupt? Die Vorlesung war so verwirrend...",
      author: "Michael",
      authorId: "user11",
      timestamp: new Date('2024-03-21'),
      replies: [
        {
          id: '550e8400-e29b-41d4-a716-446655440011',
          text: "Hab's auch erst nicht gecheckt! Stell dir einen Familienstammbaum vor, wo die Eltern immer größer sind als ihre Kinder. Das ist ein Max-Heap! Dann nimmst du immer den größten (die Wurzel) und tauschst ihn ans Ende. Hat bei mir Klick gemacht! 🌳",
          author: "Robert",
          authorId: "user12",
          timestamp: new Date('2024-03-21'),
          parentId: '550e8400-e29b-41d4-a716-446655440010'
        }
      ]
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440012',
      text: "Is Heapsort really O(n log n) in all cases? Even worst case?",
      author: "Lisa",
      authorId: "user13",
      timestamp: new Date('2024-03-20'),
      replies: [
        {
          id: '550e8400-e29b-41d4-a716-446655440013',
          text: "War auch lost! Aber hab's jetzt verstanden: Heapsort ist wie ein zuverlässiger Mittelweg - nicht super schnell, aber auch nie super langsam. Anders als Quicksort, der manchmal total einbricht 😅",
          author: "Wilhelm",
          authorId: "user14",
          timestamp: new Date('2024-03-20'),
          parentId: '550e8400-e29b-41d4-a716-446655440012'
        }
      ]
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440014',
      text: "I've been stuck for hours trying to implement heapify! The recursion is making my head spin. 😫",
      author: "Felix",
      authorId: "user30",
      timestamp: new Date('2024-03-19'),
      replies: [
        {
          id: '550e8400-e29b-41d4-a716-446655440015',
          text: "Versuch mal den Heap als Baum zu zeichnen! Hat mir total geholfen die Eltern-Kind Beziehungen zu verstehen. Fang mit 5-6 Zahlen an, dann wird's klarer! 🌳",
          author: "Lena",
          authorId: "user31",
          timestamp: new Date('2024-03-19'),
          parentId: '550e8400-e29b-41d4-a716-446655440014'
        }
      ]
    }
  ],
  mergeSort: [
    {
      id: '550e8400-e29b-41d4-a716-446655440020',
      text: "Leute, ich versteh nicht, warum Mergesort so viel Speicher braucht? 😫 Und was bedeutet das überhaupt mit dem O(n) Speicher?",
      author: "Katharina",
      authorId: "user15",
      timestamp: new Date('2024-03-22'),
      replies: [
        {
          id: '550e8400-e29b-41d4-a716-446655440021',
          text: "Hab's gestern kapiert! Stell dir vor, du sortierst Karten und brauchst einen zweiten Tisch zum Ablegen. Das ist der extra Speicher. Nervig, aber dafür wird's schön sortiert! 🃏✨",
          author: "Jonas",
          authorId: "user16",
          timestamp: new Date('2024-03-22'),
          parentId: '550e8400-e29b-41d4-a716-446655440020'
        }
      ]
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440022',
      text: "Die Animation hat mir mega geholfen das mit dem Teilen und Zusammenfügen zu verstehen! Endlich macht's Sinn! 🎯",
      author: "Hannah",
      authorId: "user32",
      timestamp: new Date('2024-03-18'),
      replies: []
    }
  ],
  quickSort: [
    {
      id: '550e8400-e29b-41d4-a716-446655440030',
      text: "Kann mir jemand erklären, warum alle Quicksort so toll finden? 🤔 In der Übung hat's bei mir voll oft nicht funktioniert...",
      author: "Jan",
      authorId: "user17",
      timestamp: new Date('2024-03-21'),
      replies: [
        {
          id: '550e8400-e29b-41d4-a716-446655440031',
          text: "Same! Aber wenn man den richtigen Pivot erwischt, ist er echt schnell. Hab's mit dem mittleren Element probiert, das klappt meistens besser als immer das erste zu nehmen! 💡",
          author: "Marie",
          authorId: "user18",
          timestamp: new Date('2024-03-21'),
          parentId: '550e8400-e29b-41d4-a716-446655440030'
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440032',
          text: "Hab gelesen, dass er gut mit dem Arbeitsspeicher umgeht, weil er die Daten lokal sortiert. Aber ehrlich gesagt versteh ich nicht, was das bedeuten soll... 🤷‍♂️",
          author: "Elena",
          authorId: "user19",
          timestamp: new Date('2024-03-21'),
          parentId: '550e8400-e29b-41d4-a716-446655440030'
        }
      ]
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440033',
      text: "Diese Pivot-Auswahl macht mich fertig! Bei sortierten Arrays läuft mein Code ewig... Was mache ich falsch? 😤",
      author: "Lukas",
      authorId: "user33",
      timestamp: new Date('2024-03-20'),
      replies: [
        {
          id: '550e8400-e29b-41d4-a716-446655440034',
          text: "Kenn ich! Nimm einfach nicht immer das erste Element als Pivot. Probier mal den Median von ersten, mittleren und letzten Element - läuft viel besser! 💡",
          author: "Nina",
          authorId: "user34",
          timestamp: new Date('2024-03-20'),
          parentId: '550e8400-e29b-41d4-a716-446655440033'
        }
      ]
    }
  ],
  radixSort: [
    {
      id: '550e8400-e29b-41d4-a716-446655440040',
      text: "Ich check's nicht 😩 Wie kann Radix Sort schneller sein als die anderen? In der Vorlesung hieß es doch, schneller als O(n log n) geht nicht???",
      author: "Daniel",
      authorId: "user20",
      timestamp: new Date('2024-03-20'),
      replies: [
        {
          id: '550e8400-e29b-41d4-a716-446655440041',
          text: "War auch mega verwirrt! Aber ist wie beim Sortieren von Postkarten nach PLZ - erst nach der letzten Zahl, dann vorletzte usw. Keine Vergleiche, deswegen ist's schneller! 📬",
          author: "Tim",
          authorId: "user21",
          timestamp: new Date('2024-03-20'),
          parentId: '550e8400-e29b-41d4-a716-446655440040'
        }
      ]
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440042',
      text: "Wann sollte man eigentlich RadixSort benutzen? Gibt ja schon echt viele Sortieralgorithmen... 🤨",
      author: "Sophie",
      authorId: "user22",
      timestamp: new Date('2024-03-19'),
      replies: [
        {
          id: '550e8400-e29b-41d4-a716-446655440043',
          text: "Ist super für Sachen wie Postleitzahlen oder Matrikelnummern! Alles wo die Länge fest ist. Hab's letztens für mein Projekt benutzt, lief echt gut! 📮",
          author: "Sebastian",
          authorId: "user23",
          timestamp: new Date('2024-03-19'),
          parentId: '550e8400-e29b-41d4-a716-446655440042'
        }
      ]
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440044',
      text: "Bin ich der Einzige, der bei dem Counting-Sort-Teil komplett lost ist? Der Code sieht aus wie Zauberei... 😕",
      author: "Maximilian",
      authorId: "user35",
      timestamp: new Date('2024-03-21'),
      replies: [
        {
          id: '550e8400-e29b-41d4-a716-446655440045',
          text: "Denk einfach an Briefkästen! Du sortierst nach der letzten Ziffer in verschiedene Kästen, dann nach der vorletzten und so weiter. Hat bei mir Klick gemacht! 📬",
          author: "Laura",
          authorId: "user36",
          timestamp: new Date('2024-03-21'),
          parentId: '550e8400-e29b-41d4-a716-446655440044'
        }
      ]
    }
  ],
  bucketSort: [
    {
      id: '550e8400-e29b-41d4-a716-446655440050',
      text: "Mein Kopf raucht... 🤯 Was bedeutet diese O(n+k) Komplexität? Und wieso klappt das bei meinen Testdaten nicht?",
      author: "Tobias",
      authorId: "user24",
      timestamp: new Date('2024-03-22'),
      replies: [
        {
          id: '550e8400-e29b-41d4-a716-446655440051',
          text: "Hatte das gleiche Problem! Ist wie beim Sortieren von Murmeln in Schachteln - wenn alle in eine Schachtel fallen, wird's chaos. Besser wenn sie sich schön verteilen! 🎱",
          author: "Leonie",
          authorId: "user25",
          timestamp: new Date('2024-03-22'),
          parentId: '550e8400-e29b-41d4-a716-446655440050'
        }
      ]
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440052',
      text: "Der Algorithmus ist echt Müll für meine Daten! Alles landet im gleichen Bucket und es dauert ewig... 😡",
      author: "Paul",
      authorId: "user37",
      timestamp: new Date('2024-03-21'),
      replies: [
        {
          id: '550e8400-e29b-41d4-a716-446655440053',
          text: "BucketSort ist halt nicht für alle Daten gut... Wie sehen deine Daten denn aus? Vielleicht probierst du besser Quicksort oder Mergesort, die sind flexibler! 🔄",
          author: "Julia",
          authorId: "user38",
          timestamp: new Date('2024-03-21'),
          parentId: '550e8400-e29b-41d4-a716-446655440052'
        }
      ]
    }
  ],
  countingSort: [
    {
      id: '550e8400-e29b-41d4-a716-446655440060',
      text: "Warum machen wir das so kompliziert mit dem extra Array? 😕 Kann man nicht einfach direkt sortieren?",
      author: "Niklas",
      authorId: "user26",
      timestamp: new Date('2024-03-21'),
      replies: [
        {
          id: '550e8400-e29b-41d4-a716-446655440061',
          text: "Dachte auch erst es wäre unnötig! Aber wenn du Zahlen wie 4,4,4,1 hast, dann willst du ja dass die 4er in der gleichen Reihenfolge bleiben. Das extra Array hilft dabei! 🔢",
          author: "Sophia",
          authorId: "user27",
          timestamp: new Date('2024-03-21'),
          parentId: '550e8400-e29b-41d4-a716-446655440060'
        }
      ]
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440062',
      text: "Der braucht voll viel Speicher bei großen Zahlen... Gibt's da nicht einen Trick? 🤔",
      author: "Lara",
      authorId: "user28",
      timestamp: new Date('2024-03-20'),
      replies: [
        {
          id: '550e8400-e29b-41d4-a716-446655440063',
          text: "Man kann eine HashMap benutzen, um nur die Zahlen zu zählen, die auch wirklich vorkommen! Oder RadixSort nehmen, wenn die Zahlen eine feste Länge haben. Hab beides ausprobiert! 💭",
          author: "Moritz",
          authorId: "user29",
          timestamp: new Date('2024-03-20'),
          parentId: '550e8400-e29b-41d4-a716-446655440062'
        }
      ]
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440064',
      text: "Endlich mal ein Algorithmus den ich verstehe! 🎉 Einfach nur zählen wie oft jede Zahl vorkommt, oder? Oder übersehe ich was? 😅",
      author: "Finn",
      authorId: "user39",
      timestamp: new Date('2024-03-22'),
      replies: [
        {
          id: '550e8400-e29b-41d4-a716-446655440065',
          text: "Ja, für Zahlen ist's easy! Aber versuch mal Wörter damit zu sortieren... da wird's tricky! Bin da auch noch am Knobeln 🤔",
          author: "Mia",
          authorId: "user40",
          timestamp: new Date('2024-03-22'),
          parentId: '550e8400-e29b-41d4-a716-446655440064'
        }
      ]
    }
  ]
}; 
import { Comment } from '../../src/types/comments.types';

export const initialComments: Record<string, Comment[]> = {
  insertionSort: [
    {
      id: '550e8400-e29b-41d4-a716-446655440000',
      text: "I don't understand why we start the outer loop from index 1 instead of 0. Can someone explain this?",
      author: "Sarah Chen",
      authorId: "user1",
      timestamp: new Date('2024-03-20'),
      replies: [
        {
          id: '550e8400-e29b-41d4-a716-446655440001',
          text: "The first element (index 0) is considered as the 'sorted portion' initially. We then take each element starting from index 1 and insert it into its correct position in this sorted portion. That's why we start from 1!",
          author: "Prof. Miller",
          authorId: "user2",
          timestamp: new Date('2024-03-20'),
          parentId: '550e8400-e29b-41d4-a716-446655440000'
        }
      ]
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      text: "The time complexity is O(n²), but why is it still considered efficient for small datasets? Isn't QuickSort always better?",
      author: "Alex Thompson",
      authorId: "user3",
      timestamp: new Date('2024-03-19'),
      replies: [
        {
          id: '550e8400-e29b-41d4-a716-446655440003',
          text: "For small datasets, the constant factors matter more than asymptotic complexity. Insertion Sort has very low overhead and performs few swaps compared to QuickSort. It's also very efficient for nearly sorted data!",
          author: "David Kumar",
          authorId: "user4",
          timestamp: new Date('2024-03-19'),
          parentId: '550e8400-e29b-41d4-a716-446655440002'
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440004',
          text: "That's right! Plus, many real-world applications use Insertion Sort as part of hybrid sorting algorithms. For example, QuickSort often switches to Insertion Sort for small subarrays (usually less than 10-20 elements).",
          author: "Emma Wilson",
          authorId: "user5",
          timestamp: new Date('2024-03-19'),
          parentId: '550e8400-e29b-41d4-a716-446655440002'
        }
      ]
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440005',
      text: "Is it true that Insertion Sort is adaptive? What does that even mean?",
      author: "Tom Jackson",
      authorId: "user8",
      timestamp: new Date('2024-03-17'),
      replies: [
        {
          id: '550e8400-e29b-41d4-a716-446655440006',
          text: "Yes! Adaptive means the algorithm's performance improves when the input is already partially sorted. In Insertion Sort, fewer shifts are needed for nearly sorted arrays, making it run closer to O(n) time!",
          author: "Dr. Anderson",
          authorId: "user9",
          timestamp: new Date('2024-03-17'),
          parentId: '550e8400-e29b-41d4-a716-446655440005'
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440007',
          text: "A great example is maintaining a sorted list: if you need to add new elements to an already sorted list, Insertion Sort is perfect because it will be very fast (almost linear time)!",
          author: "Maya Patel",
          authorId: "user10",
          timestamp: new Date('2024-03-17'),
          parentId: '550e8400-e29b-41d4-a716-446655440005'
        }
      ]
    }
  ]
}; 
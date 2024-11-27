export const mockPosts = [
    {
      id: 1,
      author: {
        username: 'john_doe',
        profilePicture: 'https://via.placeholder.com/150'
      },
      caption: 'This is a fake post content.',
      image: 'https://via.placeholder.com/600',
      likes: [1, 2, 3],
      comments: [
        { username: 'jane_doe', comment: 'Nice post!' },
        { username: 'user123', comment: 'Great content!' }
      ]
    },
    {
      id: 2,
      author: {
        username: 'jane_doe',
        profilePicture: 'https://via.placeholder.com/150'
      },
      caption: 'Another fake post content.',
      image: 'https://via.placeholder.com/600',
      likes: [1, 2],
      comments: [
        { username: 'john_doe', comment: 'Awesome!' },
        { username: 'user456', comment: 'Love it!' }
      ]
    }
  ];
  
  export const mockSuggestions = [
    {
      _id: '1',
      username: 'user123',
      profilePicture: 'https://via.placeholder.com/150',
      bio: 'Bio for user123'
    },
    {
      _id: '2',
      username: 'user456',
      profilePicture: 'https://via.placeholder.com/150',
      bio: 'Bio for user456'
    },
    {
      _id: '3',
      username: 'user789',
      profilePicture: 'https://via.placeholder.com/150',
      bio: 'Bio for user789'
    }
  ];
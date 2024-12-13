import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
// Removed 'swiper/css/pagination'
import { Navigation } from 'swiper/modules'; // Removed Pagination

const users = [
  // Your large list of users
  ...Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    profilePic: `https://via.placeholder.com/100?text=User+${i + 1}`,
    friends: Math.floor(Math.random() * 50),
  })),
];

// Helper function to paginate users
const paginateUsers = (users, pageSize, currentPage) => {
  const start = currentPage * pageSize;
  const end = start + pageSize;
  return users.slice(start, end);
};

const FriendsRecommendation = () => {
  const pageSize = 12; // Number of users to load at a time
  const [currentPage, setCurrentPage] = useState(0);
  const [displayedUsers, setDisplayedUsers] = useState(paginateUsers(users, pageSize, 0));

  // Function to load more users
  const loadMoreUsers = () => {
    const nextPage = currentPage + 1;
    const newUsers = paginateUsers(users, pageSize, nextPage);
    if (newUsers.length > 0) {
      setDisplayedUsers((prev) => [...prev, ...newUsers]);
      setCurrentPage(nextPage);
    }
  };

  return (
    <div className="flex justify-center items-center p-5 bg-gray-100">
      <div className="max-w-5xl w-full">
        <Swiper
          modules={[Navigation]} // Removed Pagination module
          spaceBetween={20}
          slidesPerView={3}
          navigation
          onReachEnd={() => {
            // Trigger loadMoreUsers when the last slide is reached
            console.log('Reached end of slides');
            loadMoreUsers();
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full"
        >
          {displayedUsers.map((user) => (
            <SwiperSlide key={user.id}>
              <div
                className="bg-white border border-gray-200 rounded-sm shadow-md p-5 w-52 text-center transform transition-transform hover:-translate-y-1 cursor-pointer"
                onClick={() => console.log('cardClicked')}
              >
                <div className="flex justify-center items-center">
                  <img
                    src={user.profilePic}
                    alt={`${user.name} Profile`}
                    className="w-20 h-20 rounded-full mx-auto mb-3"
                  />
                  <h3 className="text-lg font-semibold mb-2">{user.name}</h3>
                </div>
                <p className="text-sm mb-4 text-green-600 font-semibold">
                  Friends: {user.friends}
                </p>
                <button className="bg-[#272727] text-white px-4 py-1 rounded-md hover:bg-[#0a0a0a]">
                  <span className="text-xl mr-1">+</span> Add Friend
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FriendsRecommendation;

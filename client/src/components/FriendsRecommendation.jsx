// import { useState, useEffect } from 'react'; // Import hooks for managing state and lifecycle events
// import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper components for creating a carousel
// import 'swiper/css'; // Import basic Swiper styles
// import 'swiper/css/navigation'; // Import navigation styles for Swiper
// import { Navigation } from 'swiper/modules'; // Import the navigation module for Swiper
// import { infinityLoadUsers } from '../../api/internal';


// // Component: Displays recommended friends with infinite loading
// const FriendsRecommendation = () => {
//   const pageSize = 2; // Number of users to load in each batch
//   const [displayedUsers, setDisplayedUsers] = useState([]); // State to store the users displayed on the screen
//   const [loading, setLoading] = useState(false); // State to track if users are currently being fetched
//   const [hasMore, setHasMore] = useState(true); // State to check if more users are available to load
//   const [lastId, setLastId] = useState(null); // Tracks the last loaded user's ID for pagination
//   // Function to fetch users from the backend
//   const loadMoreUsers = async () => {
//     if (loading || !hasMore) return; // Prevent fetching if already loading or no more users to load

//     setLoading(true); // Set loading state to true to indicate data is being fetched
//     try {
//       // Make a GET request to fetch users from the backend with pagination
//       const { data } = await infinityLoadUsers(pageSize,lastId);
//       const newUsers = data.users; // Extract the new users from the response
//       setDisplayedUsers((prev) => [...prev, ...newUsers]); // Add new users to the existing list
//       setHasMore(data.hasMore); // Update if there are more users to load
//       setLastId(data.lastId); // Update the last user's ID for the next request
//     } catch (error) {
//       console.error('Failed to fetch users:', error); // Log any errors to the console
//     } finally {
//       setLoading(false); // Reset loading state to false after the request is complete
//     }
//   };

//   // Load the first batch of users when the component is rendered
//   useEffect(() => {
//     loadMoreUsers(); // Call loadMoreUsers once when the component mounts
//   }, []); // Empty dependency array ensures this runs only on mount

//   // Return the JSX for rendering the component
//   return (
//     <div className="flex justify-center items-center p-5 bg-gray-100">
//       {/* Outer container with centered content */}
//       <div className="max-w-5xl w-full">
//         {/* Swiper: Carousel for displaying users */}
//         <Swiper
//           modules={[Navigation]} // Enable navigation for Swiper
//           spaceBetween={20} // Space between slides
//           slidesPerView={3} // Number of slides visible at once
//           navigation // Enable navigation arrows
//           onReachEnd={() => {
//             if (hasMore) {
//               loadMoreUsers(); // Load more users when the user scrolls to the end
//             }
//           }}
//           breakpoints={{
//             // Configure the number of slides based on screen width
//             640: { slidesPerView: 2 }, // 2 slides on smaller screens
//             768: { slidesPerView: 3 }, // 3 slides on medium screens
//             1024: { slidesPerView: 4 }, // 4 slides on larger screens
//           }}
//           className="w-full"
//         >
//           {/* Map through the displayedUsers array to create slides */}
//           {displayedUsers.map((user) => (
//             <SwiperSlide key={user.id}>
//               {/* Each user's card */}
//               <div
//                 className="bg-white border border-gray-200 rounded-sm shadow-md p-5 w-52 text-center transform transition-transform hover:-translate-y-1 cursor-pointer"
//                 onClick={() => console.log('cardClicked')} // Log a message when the card is clicked
//               >
//                 <div className="flex justify-center items-center">
//                   <img
//                     src={user.profilePic} // Display user's profile picture
//                     alt={`${user.name} Profile`} // Provide alternate text
//                     className="w-20 h-20 rounded-full mx-auto mb-3" // Style the image
//                   />
//                   <h3 className="text-lg font-semibold mb-2">{user.name}</h3> {/* Display user's name */}
//                 </div>
//                 <p className="text-sm mb-4 text-green-600 font-semibold">
//                   Friends: {user.friends} {/* Display user's number of friends */}
//                 </p>
//                 <button className="bg-[#272727] text-white px-4 py-1 rounded-md hover:bg-[#0a0a0a]">
//                   <span className="text-xl mr-1">+</span> Add Friend {/* Add Friend button */}
//                 </button>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//         {loading && <p className="text-center mt-4">Loading...</p>} {/* Show "Loading..." when data is being fetched */}
//         {!hasMore && <p className="text-center mt-4">No more users to load</p>} {/* Show message when no more users */}
//       </div>
//     </div>
//   );
// };

// export default FriendsRecommendation; // Export the component for use in other parts of the app


// import { useState, useEffect } from 'react';
// import { infinityLoadUsers } from '../../api/internal';
// import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper components for creating a carousel
// import { Navigation } from 'swiper/modules'; // Import Navigation module from the correct path
// import 'swiper/css'; // Import basic Swiper styles
// import 'swiper/css/navigation'; // Import navigation styles for Swiper

// const FriendsRecommendation = () => {
//     const pageSize = 3; // Number of users to load in each batch
//     const [displayedUsers, setDisplayedUsers] = useState([]); // State to store the users displayed on the screen
//     const [loading, setLoading] = useState(false);
//     const [hasMore, setHasMore] = useState(true); // State to check if more users are available to load
//     const [lastId, setLastId] = useState(null); // Tracks the last loaded user's ID for pagination

//     const loadMoreUsers = async () => {
//         if (loading || !hasMore) return; // Prevent duplicate calls
//         setLoading(true);

//         try {
//             const { data } = await infinityLoadUsers(pageSize, lastId);
//             console.log('Fetched users:', data.users);

//             setDisplayedUsers((prev) => {
//                 const updatedUsers = [...prev, ...data.users];
//                 const uniqueUsers = updatedUsers.filter(
//                     (user, index, self) => index === self.findIndex((u) => u._id === user._id)
//                 );
//                 return uniqueUsers;
//             });

//             setLastId(data.lastId);
//             setHasMore(data.hasMore);
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         } finally {
//             setLoading(false); // Ensure loading is set back to false
//         }
//     };

//     useEffect(() => {
//         loadMoreUsers(); // Fetch users on component mount
//     }, []); // Empty dependency array ensures this runs only once

//     return (
//         <div className="friends-container">
//             <Swiper
//                 modules={[Navigation]} // Enable the Navigation module
//                 navigation // Enables navigation arrows
//                 spaceBetween={20} // Space between slides
//                 slidesPerView={3} // Number of slides visible at once
//                 onReachEnd={() => {
//                     if (hasMore) {
//                         loadMoreUsers(); // Trigger to load more users when reaching the end
//                     }
//                 }}
//             >
//                 {displayedUsers.map((user) => (
//                     <SwiperSlide key={user.email}>
//                         <div className="user-card">
//                             <h3 className="user-username">{user.username}</h3>
//                             <p className="user-email">{user.email}</p>
//                         </div>
//                     </SwiperSlide>
//                 ))}
//             </Swiper>

//             {loading && <p>Loading...</p>}
//             {!hasMore && <p>No more users to load.</p>}
//         </div>
//     );
// };

// export default FriendsRecommendation;

import { useState, useEffect } from 'react';
import { infinityLoadUsers } from '../../api/internal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const FriendsRecommendation = () => {
    const pageSize = 5; // Number of users to load in each batch

    // Initialize state from local storage if available
    const [displayedUsers, setDisplayedUsers] = useState(() => {
        const savedUsers = localStorage.getItem('displayedUsers');
        if (!savedUsers) return [];
        const uniqueUsers = JSON.parse(savedUsers).filter(
            (user, index, self) => index === self.findIndex((u) => u._id === user._id)
        );
        return uniqueUsers;
    });

    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(() => {
        const savedHasMore = localStorage.getItem('hasMore');
        return savedHasMore ? savedHasMore === 'true' : true;
    });

    const [lastId, setLastId] = useState(() => {
        const savedLastId = localStorage.getItem('lastId');
        return savedLastId || null;
    });

    const loadMoreUsers = async () => {
        console.log('loadMore user Called!')
        if (loading || !hasMore) return; // Prevent duplicate calls
        setLoading(true);

        try {
            const { data } = await infinityLoadUsers(pageSize, lastId);
            console.log('Fetched users:', data.users);

            setDisplayedUsers((prev) => {
                const existingIds = new Set(prev.map((user) => user._id));
                const newUsers = data.users.filter((user) => !existingIds.has(user._id));
                return [...prev, ...newUsers];
            });

            setLastId(data.lastId);
            setHasMore(data.hasMore);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    // Save data to local storage whenever displayedUsers or other relevant state changes
    useEffect(() => {
        const uniqueUsers = displayedUsers.filter(
            (user, index, self) => index === self.findIndex((u) => u._id === user._id)
        );
        localStorage.setItem('displayedUsers', JSON.stringify(uniqueUsers));
        localStorage.setItem('lastId', lastId);
        localStorage.setItem('hasMore', hasMore);
    }, [displayedUsers, lastId, hasMore]);

    // Initial data fetch only if no data in local storage
    useEffect(() => {
        if (displayedUsers.length === 0) {
            loadMoreUsers();
        }
    }, []); // Only run once on mount

    useEffect(() => {
        console.log(displayedUsers)
    }, [displayedUsers]);

    return (
        <div className="flex justify-center items-center p-5 bg-gray-100">
            <div className="max-w-5xl w-full">
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={4}
                    navigation={{
                        disabledClass: 'swiper-button-disabled', // Ensure proper classes are applied
                    }}
                    watchOverflow={false} // Always show navigation arrows
                    onReachEnd={() => {
                        if (hasMore) {
                            loadMoreUsers(); // Fetch more users when reaching the end
                        }
                    }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                    className="w-full"
                >
                    {displayedUsers.map((user) => (
                        <SwiperSlide key={user._id}>
                            <div
                                className="bg-white border border-gray-200 rounded-sm shadow-md p-5 w-52 text-center transform transition-transform hover:-translate-y-1 cursor-pointer"
                                onClick={() => console.log(`User clicked: ${user.username}`)}
                            >
                                <div className="flex justify-center items-center">
                                    <img
                                        src={user.profilePic || 'https://via.placeholder.com/150'}
                                        alt={`${user.username} Profile`}
                                        className="w-20 h-20 rounded-full mx-auto mb-3"
                                    />
                                    <p className="text-lg font-semibold mb-2">{user.username}</p>
                                </div>
                                <p className="text-sm mb-4 text-green-600 font-semibold">
                                    Friends: {user.friends || 0}
                                </p>
                                <button className="bg-[#272727] text-white px-4 py-1 rounded-md hover:bg-[#0a0a0a]">
                                    <span className="text-xl mr-1">+</span> Add Friend
                                </button>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {loading && <p className="text-center mt-4">Loading...</p>}
                {!hasMore && <p className="text-center mt-4">No more users to load</p>}
            </div>
        </div>
    );
};

export default FriendsRecommendation;

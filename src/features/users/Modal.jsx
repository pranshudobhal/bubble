import { XIcon } from '@heroicons/react/solid';

/**
 *
 * TODO:
 * - Add user image as well
 */

export const Modal = ({ setShowModal, heading, content }) => {
  return (
    <>
      <div className="justify-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-5/7 md:w-4/7 lg:w-3/7 xl:w-2/6 my-10 mx-auto max-w-3xl">
          <div className="border-0 rounded-xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none max-h-full">
            <div className="flex items-center justify-between p-5 border-b border-solid border-gray-200 rounded-t">
              <h3 className="text-2xl font-semibold text-black ml-4">{heading}</h3>
              <span className="text-black h-6 w-6 text-2xl block cursor-pointer" onClick={() => setShowModal(false)}>
                <XIcon className="h-6 w-6 text-gray-500" />
              </span>
            </div>
            <div className="relative px-6 pt-2 pb-4 flex-auto overflow-y-auto modal">
              <ul>
                {content.map((user) => {
                  return (
                    <li key={user.username} className="flex p-2 py-4 items-center">
                      <div className="self-start mr-2">
                        <img src="https://unsplash.it/400/400" className="rounded-full h-12 w-12 object-cover object-center" alt="userimage" />
                      </div>
                      <div className="text-black font-semibold text-md flex flex-col flex-1">
                        <div>{user.firstName + ' ' + user.lastName}</div>
                        <div className="text-sm text-gray-500 text-opacity-80 font-normal">@{user.username}</div>
                      </div>
                      <div className="">
                        <button className="bg-gray-100 text-gray-500 font-semibold p-3 rounded-lg hover:bg-gray-300">Following</button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-30 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

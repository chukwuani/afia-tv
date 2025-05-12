import { Plus, Link, User, Calendar } from "lucide-react";

export default function WorkflowPage() {
  return (
    <div className="container mx-auto py-32 px-6 md:px-10 lg:px-20">
      <div className="text-center mb-16 max-w-[650px] mx-auto">
        <h1 className="text-4xl sm:text-5xl text-pretty font-garamond font-normal text-primary text-center">
          Enhance workflow with powerful tools
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        {/* Task labels card */}
        <div className="flex rounded-3xl p-8 bg-[#fff6f5]">
          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-xl font-semibold text-[#292929]">
                Task management
              </h2>
            </div>
            <p className="text-[#5c5c5c] mb-6">
              Manage tasks efficiently with our intuitive task management system
            </p>
          </section>

          <div className="bg-white p-6 rounded-2xl">
            <h3 className="text-lg font-medium text-[#292929] mb-6">
              Add labels
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-[#ff6347] mr-2"></span>
                <span className="text-sm text-[#292929]">High Priority</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-[#ff6347] mr-2"></span>
                <span className="text-sm text-[#292929]">Urgent</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-[#ff6347] mr-2"></span>
                <span className="text-sm text-[#292929]">In progress</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-[#ff6347] mr-2"></span>
                <span className="text-sm text-[#292929]">New</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-[#ff6347] mr-2"></span>
                <span className="text-sm text-[#292929]">Completed</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-[#ff6347] mr-2"></span>
                <span className="text-sm text-[#292929]">Active</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-[#ff6347] mr-2"></span>
                <span className="text-sm text-[#292929]">Pending</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Task completion card */}
        <div className="rounded-3xl p-8 bg-[#fff6f5]">
          <p className="text-[#5c5c5c] mb-6">
            Monitor overall progress and completed tasks in real time easily
          </p>

          <div className="bg-white p-6 rounded-2xl mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="bg-[#ff6347] text-white text-sm font-medium px-3 py-1 rounded-full">
                2,309
              </div>
            </div>
            <div className="relative h-24">
              <svg viewBox="0 0 400 100" className="w-full h-full">
                <path
                  d="M0,50 Q50,30 100,40 T200,30 T300,40 T400,20"
                  fill="none"
                  stroke="#ff6347"
                  strokeWidth="3"
                />
                <path
                  d="M0,50 Q50,30 100,40 T200,30 T300,40 T400,20 L400,100 L0,100 Z"
                  fill="url(#gradient)"
                  opacity="0.2"
                />
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#ff6347" />
                    <stop offset="100%" stopColor="#ff6347" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="border-l-4 border-[#ff6347] pl-3">
              <div className="text-2xl font-bold text-[#292929]">85%</div>
              <div className="text-sm text-[#5c5c5c]">Task completed</div>
            </div>
            <div className="border-l-4 border-[#ff6347] pl-3">
              <div className="text-2xl font-bold text-[#292929]">23+</div>
              <div className="text-sm text-[#5c5c5c]">Task added</div>
            </div>
            <div className="border-l-4 border-[#ff6347] pl-3">
              <div className="text-2xl font-bold text-[#292929]">08</div>
              <div className="text-sm text-[#5c5c5c]">Active task</div>
            </div>
          </div>
        </div>

        {/* Task creation card */}
        <div className="rounded-3xl p-8 bg-[#fff6f5]">
          <p className="text-[#5c5c5c] mb-6">
            Easily create and manage tasks with team collaboration
          </p>

          <div className="bg-white p-6 rounded-2xl">
            <div className="flex items-center mb-6">
              <div className="w-1 h-6 bg-[#ff6347] rounded-full mr-3"></div>
              <h3 className="text-lg font-medium text-[#292929]">
                Add new task
              </h3>
              <button className="ml-auto">
                <Plus className="w-5 h-5 text-[#292929]" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center border-b border-gray-100 pb-4">
                <div className="w-5 h-5 mr-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.6667 3.33334H3.33333C2.8731 3.33334 2.5 3.70644 2.5 4.16668V15.8333C2.5 16.2936 2.8731 16.6667 3.33333 16.6667H16.6667C17.1269 16.6667 17.5 16.2936 17.5 15.8333V4.16668C17.5 3.70644 17.1269 3.33334 16.6667 3.33334Z"
                      stroke="#5c5c5c"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.5 7.5H17.5"
                      stroke="#5c5c5c"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Project Name"
                  className="bg-transparent w-full outline-none text-[#5c5c5c]"
                />
              </div>

              <div className="flex items-center border-b border-gray-100 pb-4">
                <Link className="w-5 h-5 mr-3 text-[#5c5c5c]" />
                <input
                  type="text"
                  placeholder="https://www.framer.com?via=muzamal32"
                  className="bg-transparent w-full outline-none text-[#5c5c5c]"
                />
              </div>

              <div className="flex items-center border-b border-gray-100 pb-4">
                <User className="w-5 h-5 mr-3 text-[#5c5c5c]" />
                <input
                  type="text"
                  placeholder="Enter a name or Email addresses"
                  className="bg-transparent w-full outline-none text-[#5c5c5c]"
                />
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-[#ff6347] border-2 border-white"></div>
                  <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white"></div>
                  <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-white"></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-3 text-[#5c5c5c]" />
                  <span className="text-[#5c5c5c]">Sunday, 30 August 2023</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[#ff6347] mr-2"></span>
                  <span className="text-sm text-[#5c5c5c]">
                    Task deadline in 3 days
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

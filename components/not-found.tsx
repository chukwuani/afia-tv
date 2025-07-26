const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden ">
      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] px-6">
        {/* 404 Text */}
        <div className="relative flex items-center justify-center mb-8 mix">
          <h1 className="text-[333px] font-erica-one leading-[0.9em] -tracking-[0.5px] text-black">
            404
          </h1>
        </div>

        {/* Description*/}
        <div className="text-center max-w-2xl mb-8">
          <p className="text-xl leading-relaxed mb-8 text-white">
            The page you are looking for doesn&apos;t exist or has been moved.
            Please go back to the homepage.
          </p>
        </div>
      </main>

      <section className="custom-gradient"></section>
    </div>
  );
};

export default NotFound;

const Logo = ({ className = "h-10 w-auto", showText = true }) => {
  return (
    <div className="flex items-center space-x-2">
      <img 
        src="/jss logo.png" 
        alt="JSS Science & Technology University" 
        className={`object-contain ${className}`}
      />
      {showText && (
        <div className="hidden sm:block">
          <h1 className='text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'>
            JSS Career Portal
          </h1>
        </div>
      )}
    </div>
  )
}

export default Logo

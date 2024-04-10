const Footer = () => {
  return (
    <div>
      
    <footer className="bg-zinc-50  text-center text-surface/75 dark:bg-neutral-700 dark:text-white/75 lg:text-left">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between border-b-2 border-neutral-200 p-6 dark:border-white/10">
            <div className="mb-4 md:mb-0 md:me-12">
                <span className="hidden md:inline-block">Get connected with us on social networks:</span>
            </div>
            <div className="flex justify-center md:justify-start">
                <a href="#!" className="me-6 [&>svg]:h-4 [&>svg]:w-4">
                </a>
            </div>
        </div>

        <div className="mx-6 py-10 text-center md:text-left">
            <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div className="mb-8 md:mb-0">
                    <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
                        <span className="me-3 [&>svg]:h-4 [&>svg]:w-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            </svg>
                        </span>
                        TW Elements
                    </h6>
                    <p>
                        Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit.
                    </p>
                </div>
                <div className="mb-8 md:mb-0">
                    <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">Products</h6>
                    <p className="mb-4">
                        <a href="#!">Angular</a>
                    </p>
                    <p className="mb-4">
                        <a href="#!">React</a>
                    </p>
                    <p className="mb-4">
                        <a href="#!">Vue</a>
                    </p>
                    <p>
                        <a href="#!">Laravel</a>
                    </p>
                </div>
                <div className="mb-8 md:mb-0">
                    <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">Useful links</h6>
                    <p className="mb-4">
                        <a href="#!">Pricing</a>
                    </p>
                    <p className="mb-4">
                        <a href="#!">Settings</a>
                    </p>
                    <p className="mb-4">
                        <a href="#!">Orders</a>
                    </p>
                    <p>
                        <a href="#!">Help</a>
                    </p>
                </div>
                <div>
                    <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">Contact</h6>
                    <p className="mb-4 flex items-center justify-center md:justify-start">
                        <span className="me-3 [&>svg]:h-5 [&>svg]:w-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            </svg>
                        </span>
                        New York, NY 10012, US
                    </p>
                    <p className="mb-4 flex items-center justify-center md:justify-start">
                        <span className="me-3 [&>svg]:h-5 [&>svg]:w-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            </svg>
                        </span>
                        info@example.com
                    </p>
                    <p className="mb-4 flex items-center justify-center md:justify-start">
                        <span className="me-3 [&>svg]:h-5 [&>svg]:w-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            </svg>
                        </span>
                        +123 456 7890
                    </p>
                </div>
            </div>
        </div>

        <div className="bg-black/5 p-6 text-center">
            <p className="text-xs md:text-sm">© 2024 Your Company. All rights reserved.</p>
        </div>
    </footer>


    </div>
  )
}

export default Footer

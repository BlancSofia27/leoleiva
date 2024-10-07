import React from "react"
import logoBunny from '../assets/logoBunny.png'
const Footer = React.forwardRef((props, ref) => {
  return (
    <footer ref={ref} id="footer" className="text-gray-600 body-font bg-zinc-200">
      <div className=" container px-5 py-3 mx-auto  md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col hidden sm:block">
        <div className=" w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left md:mt-0 mt-10 md:items-center md:justify-center">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <div className="w-9 h-9 p-2 bg-celeste rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={logoBunny}
                alt=""
              />
            </div>
            <span className="ml-3 text-md ">Powered by ClearBunny</span>
          </a>
          
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © 2023 ClearBunny —
            <a
              href="mailto:clearbunnysoftware@gmail.com?subject=Asunto del correo&body=Hola, me gustaría crear mi pagina web..."
              rel="noopener noreferrer"
              className="text-gray-600 ml-1"
              target="_blank"
            >
              clearbunnysoftware@gmail.com
            </a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <a
              href="https://wa.me/+5491166941550?text=Hola%2C%20me%20gustaría%20saber%20más%20sobre%20sus%20servicios."
              className="text-gray-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 32 32">
                <path d="M16 0c-8.844 0-16 7.156-16 16 0 2.813 0.75 5.516 2.156 7.906l-2.344 7.031 7.312-2.25c2.313 1.281 4.969 1.969 7.875 1.969 8.844 0 16-7.156 16-16s-7.156-16-16-16zM16 29.656c-2.563 0-4.969-0.75-7.031-2l-0.531-0.313-4.406 1.375 1.406-4.281-0.344-0.563c-1.344-2.094-2.094-4.531-2.094-7.031 0-7.625 6.188-13.812 13.812-13.812s13.812 6.188 13.812 13.812c0 7.594-6.188 13.781-13.812 13.781zM24.25 19.219c-0.406-0.219-2.406-1.188-2.781-1.344-0.375-0.156-0.656-0.219-0.938 0.219-0.281 0.438-1.094 1.344-1.344 1.625-0.25 0.281-0.5 0.313-0.938 0.094s-1.844-0.688-3.531-2.156c-1.313-1.188-2.188-2.656-2.438-3.094s-0.027-0.688 0.188-0.906c0.188-0.188 0.438-0.5 0.656-0.781 0.219-0.281 0.281-0.469 0.438-0.781 0.125-0.281 0.062-0.563-0.031-0.781-0.094-0.219-0.938-2.25-1.281-3.031-0.344-0.781-0.688-0.688-0.938-0.688-0.219 0-0.469 0-0.719 0s-0.656 0.094-1 0.438c-0.344 0.344-1.313 1.281-1.313 3.125s1.344 3.625 1.531 3.875c0.188 0.25 2.656 4.063 6.438 5.688 0.906 0.406 1.594 0.625 2.156 0.813 0.906 0.281 1.719 0.25 2.344 0.156 0.719-0.094 2.156-0.875 2.469-1.719 0.281-0.844 0.281-1.563 0.219-1.719-0.062-0.156-0.344-0.281-0.75-0.5z"></path>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/clearbunny_"
              className="ml-3 text-gray-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                fill="currentColor"
                className="w-5 h-5"
                viewBox="0 0 448 512"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </a>
            <a
              href="mailto:clearbunnysoftware@gmail.com"
              className="ml-3 text-gray-500"
            >
              <svg
                fill="currentColor"
                className="w-5 h-5"
                viewBox="0 0 512 512"
              >
                <path d="M502.3 190.8c3.9-3.1 5.7-8 4.8-12.8s-4.7-8.5-9.3-10.2L512 150.1V105c0-19.3-15.7-35-35-35H35C15.7 70 0 85.7 0 105v45.1l14.2 7.6c-4.6 1.7-8.2 5.4-9.3 10.2s1 9.6 4.8 12.8L256 345.9 502.3 190.8zM256 287.3L46.3 137.7 256 37.2l209.7 100.6L256 287.3zM35 512h442c19.3 0 35-15.7 35-35V217.5l-25 19.4V477H25V236.9l-25-19.4V477C0 496.3 15.7 512 35 512z" />
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
})

Footer.displayName = "Footer"
export default Footer

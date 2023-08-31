import axios from "axios"
import { useEffect, useState } from "react"

//import dotenv from "dotenv";
import "./style.css"

//dotenv.config();

function IndexPopup() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [country, setCountry] = useState<string | null>(null)
  const [city, setCity] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      const apiKey = process.env.PLASMO_PUBLIC_IPINFO_TOKEN
      setCountry(null)
      setCity(null)
      setIsLoading(true)
      const res = await axios.get("https://api.ipify.org?format=json")//fetching IP Address of the user
      const ip = res.data.ip
      console.log(ip)
      const res_location = await axios.get(
        `http://ipinfo.io/${ip}/json?token=${apiKey}`//fetching Country and city name based on IP Address
      )
      console.log(res_location)
      const ipCountry = res_location.data.country
      const ipCity = res_location.data.city
      setCountry("Your country is " + ipCountry)
      setCity("Your city is " + ipCity)
    } catch (error) {
      setError("Something went Wrong!!! Try Again ...")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-blue-200 w-[400px] h-[400px] flex flex-col items-center justify-center border-4 border-double border-blue-600 ">
      {country && city && (
        <div className="text-2xl font-sans flex flex-col gap-3 font-bold text-center mb-5 text-black uppercase">
          <div>{country}</div>

          <div>{city}</div>
        </div>
      )}

      {isLoading && (
        <div>
          <img
            src="https://cdn.discordapp.com/attachments/938278149622472714/1146801792508756049/18-location-pin.png"
            alt="logo"
            height={200}
            width={180}
            className="animate-bounce"
          />
        </div>
      )}
      {!isLoading && (
        <button
          onClick={fetchData}
          disabled={isLoading}
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xl px-5 py-3 text-center ">
          Click to see your location
        </button>
      )}

      {error && (
        <div className="bg-red-500 text-white m-2 text-md p-1 rounded-lg font-semibold">
          {error}
        </div>
      )}
    </div>
  )
}

export default IndexPopup

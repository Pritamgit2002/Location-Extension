import axios from "axios"
import { useEffect, useState } from "react"
//import dotenv from "dotenv";
import "./style.css"
//dotenv.config();

function IndexPopup() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState<string | null>(null)
  const [country, setCountry] = useState<string | null>(null)
  const [city, setCity] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (data) {
     // const apiKey = "afed51115c09d7"
     //console.log(PLASMO_PUBLIC_IPINFO_TOKEN);
     const apiKey = process.env.PLASMO_PUBLIC_IPINFO_TOKEN;
     
     console.log(apiKey);
      axios
        .get(`http://ipinfo.io/${data}/json?token=${apiKey}`)
        .then((res) => {
          const ipCountry = res.data.country
          const ipCity = res.data.city
          setCountry("Your country is " + ipCountry)
          setCity(" and your city is " + ipCity + ".")
        })
        .catch((err) => {
          setError("Something went Wrong!!! Try Again ...")
        })
    }
  }, [data])

  const handleClick = () => {
      setIsLoading(true)

    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((ipUser) => {
        // setTimeout(() => {
          setData(ipUser.ip)
          setIsLoading(false)
        // }, )
      })
  }

  return (
    <div className="bg-sky-400 w-[400px] h-[400px] flex flex-col items-center justify-center">
      <h2 className="text-2xl font-sans font-bold text-center py-5 text-white">
        <span>{country}</span>
        <br />
        {city}
      </h2>

      <button
        onClick={handleClick}
        disabled={isLoading}
        className="w-fit bg-slate-500 p-5 tracking-wider rounded-lg text-[24px] font-semibold shadow-lg shadow-slate-400">
        {isLoading ? "Loading..." : "Press to see your location"}
      </button>

      {error && (
        <div className="bg-red-500 text-white m-2 text-md p-1 rounded-lg font-semibold">
          {error}
        </div>
      )}
    </div>
  )
}

export default IndexPopup

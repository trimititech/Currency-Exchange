"use client";
import axios from "axios";
import { useEffect, useState } from "react";
const API_URL = "/api/exchange-rate";

export const useLiveExchangeRate = (url: string = API_URL) => {
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function fetchRate() {
      setLoading(true);
      setError(null);
      try {
        const resp = await axios.get(url,{
          // params:{
          //   // To be used later
          //   to:'',
          //   from:""
          // }
        });
        const inrRate = resp?.data?.rate;
        if (inrRate) {
          setRate(inrRate);
        } else {
          throw new Error("INR rate not found in response");
        }
      } catch (err) {
        console.log(err)
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchRate()
  }, [url]);
  return {rate,loading,error};
};

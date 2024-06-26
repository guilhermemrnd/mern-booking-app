import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

import hotelsService from "../services/hotels";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";

export default function HotelDetail() {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    "getHotelById",
    () => hotelsService.getHotelById(hotelId as string),
    { enabled: !!hotelId },
  );

  if (!hotel) {
    return <></>;
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="flex">
          {Array.from({ length: hotel.starRating }).map(() => (
            <AiFillStar className="fill-yellow-400" />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{hotel.name}</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {hotel.imageUrls.map((image) => (
          <div className="h-[300px]">
            <img
              src={image}
              alt={hotel.name}
              className="h-full w-full rounded-md object-cover object-center"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-2 lg:grid-cols-4">
        {hotel.facilities.map((facility) => (
          <div className="rounded-sm border border-slate-300 p-3">{facility}</div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        <div className="whitespace-pre-line">{hotel.description}</div>
        <div className="h-fit">
          <GuestInfoForm hotelId={hotel._id} pricePerNight={hotel.pricePerNight} />
        </div>
      </div>
    </div>
  );
}

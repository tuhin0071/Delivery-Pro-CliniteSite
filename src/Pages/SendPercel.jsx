import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import deliveryLocations from "../Data/Warehouse.json";
import useAxiosSecqure from "../Hooks/useAxiosSecqure";

const AddParcelForm = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);

  const axiosSecure = useAxiosSecqure();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [flowchartUrl, setFlowchartUrl] = useState("");
  const [city, setCity] = useState("");
  const [calculatedCost, setCalculatedCost] = useState(null);

  const parcelType = watch("parcelType");

  const regions = [...new Set(deliveryLocations.map((item) => item.region))];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setValue("userEmail", currentUser.email || "");
        setValue("userName", currentUser.displayName || "");
      } else {
        setUser(null);
        setValue("userEmail", "");
        setValue("userName", "");
      }
    });

    return () => unsubscribe();
  }, [auth, setValue]);

  const calculatePrice = (data) => {
    let cost = 0;
    const weight = parseFloat(data.parcelWeight) || 0;
    const type = data.parcelType;
    const sameRegion = data.senderRegion === data.receiverRegion;

    if (type === "Document") {
      cost = sameRegion ? 60 : 80;
    } else if (type === "Non-Document") {
      if (weight <= 3) {
        cost = sameRegion ? 110 : 150;
      } else {
        const baseCost = 40 * weight;
        cost = sameRegion ? baseCost : baseCost + 40;
      }
    }
    return cost;
  };

  const generateTrackingId = () => {
    return "TRK" + Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const getCostBreakdownText = (data) => {
    const weight = parseFloat(data.parcelWeight) || 0;
    const type = data.parcelType;
    const sameRegion = data.senderRegion === data.receiverRegion;
    let breakdown = "";

    if (type === "Document") {
      breakdown = `Parcel Type: Document\nRegion: ${
        sameRegion ? "Same" : "Different"
      }\nFlat Cost: ৳${sameRegion ? 60 : 80}`;
    } else if (type === "Non-Document") {
      if (weight <= 3) {
        breakdown = `Parcel Type: Non-Document\nWeight: ${weight} KG\nRegion: ${
          sameRegion ? "Same" : "Different"
        }\nFlat Cost: ৳${sameRegion ? 110 : 150}`;
      } else {
        const baseCost = 40 * weight;
        const extraCharge = sameRegion ? 0 : 40;
        breakdown = `Parcel Type: Non-Document\nWeight: ${weight} KG\nRegion: ${
          sameRegion ? "Same" : "Different"
        }\nBase Cost: ৳${baseCost.toFixed(2)}\nExtra Charge: ৳${extraCharge}\nTotal Cost: ৳${(
          baseCost + extraCharge
        ).toFixed(2)}`;
      }
    }
    return breakdown.replace(/\n/g, "<br/>");
  };

  const onSubmit = (data) => {
    const price = calculatePrice(data);
    setCalculatedCost(price);

    const currentDateTime = new Date().toISOString();
    const trackingId = generateTrackingId();

    // ✅✅✅ ✅✅✅
    // ✅ FIXED: Add `paymentStatus: "unpaid"`
    // ✅ This ensures parcels are stored as unpaid initially.
    const parcelData = {
      ...data,
      userEmail: user?.email || data.userEmail,
      userName: user?.displayName || data.userName,
      city,
      price,
      bookingDateTime: currentDateTime,
      trackingId,
      paymentStatus: "unpaid", // ✅ ✅ ✅ ADDED THIS LINE!
    };

    Swal.fire({
      icon: "success",
      title: "Parcel booked successfully!",
      html: `
        <p><strong>Tracking ID:</strong> ${trackingId}</p>
        <p><strong>Total Cost:</strong> ৳${price.toFixed(2)}</p>
        <p><strong>Cost Breakdown:</strong><br/>${getCostBreakdownText(data)}</p>
      `,
      confirmButtonText: "OK",
    });

    console.log("Parcel Data:", parcelData);

    axiosSecure.post('/parcels', parcelData)
      .then(res => {
        console.log(res.data);
      });

    reset();
    setFlowchartUrl("");
    setCity("");
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto p-6 mt-10 bg-white border border-gray-300 rounded shadow">
        <p className="text-center text-gray-700">
          You must be logged in to book a parcel.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8 mt-10 border border-gray-200 rounded-lg shadow bg-white">
      <h2 className="text-3xl font-extrabold text-green-700 mb-6">Add Parcel</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* User Email (read-only) */}
        <div className="mb-6">
          <label className="block text-gray-600 mb-1">User Email</label>
          <input
            type="email"
            value={user.email || ""}
            readOnly
            className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 cursor-not-allowed text-black"
          />
        </div>

        {/* User Name (read-only) */}
        <div className="mb-6">
          <label className="block text-gray-600 mb-1">User Name</label>
          <input
            type="text"
            value={user.displayName || ""}
            readOnly
            className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 cursor-not-allowed text-black"
          />
        </div>

        {/* Parcel Type */}
        <div className="mb-6">
          <p className="text-gray-700 font-semibold mb-2">Enter your parcel details</p>
          <div className="flex space-x-8">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                {...register("parcelType", {
                  required: "Parcel type is required",
                })}
                value="Document"
                className="accent-green-600"
              />
              <span className="ml-2 text-gray-700 font-medium">Document</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                {...register("parcelType", {
                  required: "Parcel type is required",
                })}
                value="Non-Document"
                className="accent-green-600"
              />
              <span className="ml-2 text-gray-700 font-medium">Non-Document</span>
            </label>
          </div>
          {errors.parcelType && (
            <p className="text-red-500 text-sm mt-1">{errors.parcelType.message}</p>
          )}
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-600 mb-1">Parcel Name</label>
            <input
              {...register("parcelName", {
                required: "Parcel name is required",
              })}
              placeholder="Parcel Name"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300 transition text-black"
            />
            {errors.parcelName && (
              <p className="text-red-500 text-sm mt-1">{errors.parcelName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Parcel Weight (KG)</label>
            <input
              type="number"
              step="0.01"
              {...register("parcelWeight", {
                required: "Parcel weight is required",
                min: { value: 0.1, message: "Must be positive" },
              })}
              placeholder="Parcel Weight (KG)"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300 transition text-black"
            />
            {errors.parcelWeight && (
              <p className="text-red-500 text-sm mt-1">{errors.parcelWeight.message}</p>
            )}
          </div>

          {/* Sender Details */}
          <div className="col-span-full border-t border-gray-200 mt-4 pt-4">
            <p className="text-gray-700 font-semibold mb-2">Sender Details</p>
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Sender Name</label>
            <input
              {...register("senderName", {
                required: "Sender name is required",
              })}
              placeholder="Sender Name"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300 transition text-black"
            />
            {errors.senderName && (
              <p className="text-red-500 text-sm mt-1">{errors.senderName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Sender Region</label>
            <select
              {...register("senderRegion", {
                required: "Sender region is required",
              })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300 transition text-black"
            >
              <option value="">Select your region</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            {errors.senderRegion && (
              <p className="text-red-500 text-sm mt-1">{errors.senderRegion.message}</p>
            )}
          </div>

          <div className="col-span-full">
            <label className="block text-gray-600 mb-1">Pickup Instruction</label>
            <textarea
              {...register("pickupInstruction")}
              rows={2}
              placeholder="Pickup Instruction"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300 transition text-black"
            />
          </div>

          {/* Receiver Details */}
          <div className="col-span-full border-t border-gray-200 mt-4 pt-4">
            <p className="text-gray-700 font-semibold mb-2">Receiver Details</p>
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Receiver Name</label>
            <input
              {...register("receiverName", {
                required: "Receiver name is required",
              })}
              placeholder="Receiver Name"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300 transition text-black"
            />
            {errors.receiverName && (
              <p className="text-red-500 text-sm mt-1">{errors.receiverName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Receiver Region</label>
            <select
              {...register("receiverRegion", {
                required: "Receiver region is required",
              })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300 transition text-black"
            >
              <option value="">Select your region</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            {errors.receiverRegion && (
              <p className="text-red-500 text-sm mt-1">{errors.receiverRegion.message}</p>
            )}
          </div>

          <div className="col-span-full">
            <label className="block text-gray-600 mb-1">Delivery Instruction</label>
            <textarea
              {...register("deliveryInstruction")}
              rows={2}
              placeholder="Delivery Instruction"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300 transition text-black"
            />
          </div>
        </div>

        <p className="text-gray-500 text-sm mt-4">* Pickup Time: 4pm - 7pm Approx.</p>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-green-600 text-white font-bold rounded hover:bg-green-700 transition duration-300"
          >
            Proceed to Confirm Booking
          </button>
        </div>
      </form>

      {calculatedCost !== null && (
        <div className="mt-6 text-green-700 font-semibold text-lg">
          Total Cost: ৳{calculatedCost.toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default AddParcelForm;
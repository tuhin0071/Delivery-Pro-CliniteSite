import React from 'react';
import UseAuth from '../../Hooks/UseAuth';
import useAxiosSecqure from '../../Hooks/useAxiosSecqure';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { useNavigate } from 'react-router';

const Myparcel = () => {
  const user = UseAuth();
  const axiosSecure = useAxiosSecqure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ['my-parcels', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-green-700">
        My Parcels ({parcels.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Create Time</th>
              <th className="px-4 py-3 text-left">Cost</th>
              <th className="px-4 py-3 text-left">Payment</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {parcels.map((parcel, idx) => (
              <tr key={parcel._id}>
                <td className="px-4 py-3">{idx + 1}</td>
                <td className="px-4 py-3">{parcel.parcelName}</td>
                <td className="px-4 py-3">{parcel.parcelType}</td>
                <td className="px-4 py-3">
                  {moment(parcel.bookingDateTime).format('YYYY-MM-DD HH:mm')}
                </td>
                <td className="px-4 py-3">৳{parcel.price}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handlePay(parcel)}
                    className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800"
                  >
                    Unpaid
                  </button>
                </td>
                <td className="px-4 py-3 flex flex-wrap gap-2">
                  <button
                    className="bg-green-600 text-white text-xs px-3 py-1 rounded hover:bg-green-700"
                    onClick={() => handleView(parcel)}
                  >
                    View
                  </button>
                  <button
                    className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700"
                    onClick={() => handlePay(parcel)}
                  >
                    Pay
                  </button>
                  <button
                    className="bg-red-600 text-white text-xs px-3 py-1 rounded hover:bg-red-700"
                    onClick={() => handleDelete(parcel._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  function handleView(parcel) {
    console.log('View clicked:', parcel);
    alert(JSON.stringify(parcel, null, 2));
  }

  function handlePay(parcel) {
    console.log('Pay clicked:', parcel);

    // show the alert first
    alert(`Proceeding to pay ৳${parcel.price} for parcel "${parcel.parcelName}"`);

    // then navigate
    navigate(`/dashboard/payment/${parcel._id}`);
  }

  function handleDelete(id) {
    if (confirm('Are you sure you want to delete this parcel?')) {
      axiosSecure.delete(`/parcels/${id}`).then(() => {
        alert('Parcel deleted!');
        queryClient.invalidateQueries({
          queryKey: ['my-parcels', user?.email],
        });
      });
    }
  }
};

export default Myparcel;

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecqure from '../../Hooks/useAxiosSecqure';
import UseAuth from '../../Hooks/UseAuth';

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecqure();
  const { user } = UseAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ['payments', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?userEmail=${user?.email}`);
      return res.data.payments;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <div className="text-center py-16 text-gray-600">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center py-10">
        Failed to load payment history.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-4xl font-extrabold mb-2 text-primary">My Payment History</h2>
      <p className="text-white mb-8">
        Below is a record of all your successful payments.
      </p>

      {data?.length === 0 && (
        <div className="text-center border border-gray-200 rounded-lg p-6 bg-gray-50">
          <p className="text-gray-500">You have no payments yet.</p>
        </div>
      )}

      {data?.length > 0 && (
        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Transaction ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {data.map((payment) => (
                <tr key={payment._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-800 break-all">
                    {payment.transactionId}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-green-600">
                    ${payment.amount}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(payment.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;

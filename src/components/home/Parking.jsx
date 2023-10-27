import React from 'react'




const Parkings = () => {

  // dummy data 
  const parkingData = [
    { parkingNo: 1, parkingBlock: 'A', status: 'available' },
    { parkingNo: 2, parkingBlock: 'B', status: 'available' },
    { parkingNo: 3, parkingBlock: 'C', status: 'available' },
    { parkingNo: 4, parkingBlock: 'D', status: 'available' },
    { parkingNo: 5, parkingBlock: 'E', status: 'available' },
    { parkingNo: 4, parkingBlock: 'D', status: 'available' },
    { parkingNo: 4, parkingBlock: 'D', status: 'available' },

  ];

  return (
    <div className='pt-5 pr-5 pl-5 font-Nunito'>
      
      <div className='flex justify-between pb-5 items-center  '>
        <h2 className='text-lg font-bold'>Parking Spots</h2>
        <div className='bg-gray-400 rounded w-1/4 flex justify-center items-center'>
  FILTER
</div>
      </div>

      <div className='max-h-60 overflow-y-auto pr-4 '>
        <ul>
          {parkingData.map((parking, index) => (
            <li key={index} className='pb-3'>
              <div className='flex justify-between items-center group hover:bg-gray-100 rounded'>
                <div>
                  <span className='font-bold'>Parking No: {parking.parkingNo}</span> <br />
                  <span className='text-sm'>Block: {parking.parkingBlock}</span>
                </div>

                <div className='flex gap-5 items-center'>
                  <div className='bg-green-500 h-2 w-2 rounded'></div>
                  <div className='font-bold'>{parking.status}</div>
                </div>
              </div>
              <div className='bg-gray-200 h-1 w-full'></div>
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}

export default Parkings
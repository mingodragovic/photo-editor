"use client"
import { useParams } from 'next/navigation';

const Design = () => {
  const {id} = useParams();
  return (
    <div>Design {id}</div>
  )
}

export default Design
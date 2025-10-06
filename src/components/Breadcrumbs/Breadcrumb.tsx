import { Link } from 'react-router-dom';
import React from 'react';
import { useKyc } from '../../pages/Authentication/KycContext';

interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  const { isKycVerified, kycSubmitted } = useKyc(); 
 
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h5 className="text-base font-semibold text-black dark:text-white">
        {pageName}
      </h5>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
          {
          isKycVerified && <Link className="font-medium" to="/purchase">
            Dashboard /
          </Link> 
          } 
          {
            !isKycVerified && kycSubmitted && <Link className="font-medium" to="/kycsubmitted">
            Dashboard /
          </Link> 

          }
          {
            !isKycVerified && !kycSubmitted && <Link className="font-medium" to="/kycnotverified">
            Dashboard /
          </Link> 
          }          
          </li>
          <li className="font-medium text-primary">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;

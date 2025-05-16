'use client';

import React from 'react';
import Image from 'next/image';
import styles from './CustomerShowcase.module.css';
import { withBasePath } from '../utils/basePath';

type Props = {
  id?: string;
};

interface Customer {
  name: string;
  logo: string;
}

const CustomerShowcase: React.FC<Props> = ({ id }) => {
  // Customer data with logos
  const customers: Customer[] = [
    {
      name: 'U.S. Army',
      logo: '/images/customers/new/us-army.png'
    },
    {
      name: 'U.S. Air Force',
      logo: '/images/customers/new/us-air-force.png'
    },
    {
      name: 'Platform One',
      logo: '/images/customers/new/platform-one.png'
    },
    {
      name: 'Kessel Run',
      logo: '/images/customers/new/kessellrun.png'
    },
    {
      name: 'Centers for Medicare & Medicaid Services',
      logo: '/images/customers/new/cms.png'
    }
  ];

  return (
    <section id={id} className={styles.customerShowcase}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Our Customers</h2>
        
        <div className={styles.scrollContainer}>
          <div className={styles.customerList}>
            {customers.map((customer, index) => (
              <div key={index} className={styles.customerItem}>
                <div className={styles.logoContainer}>
                  <Image
                    src={withBasePath(customer.logo)}
                    alt={`${customer.name} logo`}
                    width={220}
                    height={140}
                    className={styles.logo}
                    style={{ objectFit: 'contain' }}
                    priority={index < 3}
                  />
                </div>
                <div className={styles.customerInfo}>
                  <h3 className={styles.customerName}>{customer.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerShowcase; 
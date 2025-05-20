// Type declaration for HubSpot
declare global {
  interface Window {
    hbspt: {
      forms: {
        create: (config: {
          region: string;
          portalId: string;
          formId: string;
          target?: string;
          container?: string | HTMLElement;
        }) => any;
      };
    };
  }
}

export {}; 
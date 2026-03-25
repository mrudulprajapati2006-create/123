import React from 'react';

export interface NavItem {
  label: string;
  href: string;
  sectionId?: string;
}

export interface ProductFeature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}
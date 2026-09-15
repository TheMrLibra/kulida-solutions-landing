import React from 'react';
import Hero from '../components/Hero';
import OldVsNew from '../components/OldVsNew';
import ServicesBentoGrid from '../components/ServicesBentoGrid';
import ValueProposition from '../components/ValueProposition';
import WorkflowProcess from '../components/WorkflowProcess';
import ContactSection from '../components/ContactSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <OldVsNew />
      <ValueProposition />
      <ServicesBentoGrid />
      <WorkflowProcess />
      <ContactSection />
    </>
  );
}

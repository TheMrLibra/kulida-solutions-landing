import React from 'react';
import Hero from '../components/Hero';
import ValueProposition from '../components/ValueProposition';
import ServicesBentoGrid from '../components/ServicesBentoGrid';
import WorkflowProcess from '../components/WorkflowProcess';
import ContactSection from '../components/ContactSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesBentoGrid />
      <ValueProposition />
      <WorkflowProcess />
      <ContactSection />
    </>
  );
}

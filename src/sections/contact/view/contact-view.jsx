'use client';

import { ContactHero } from '../contact-hero';

// ----------------------------------------------------------------------

export function ContactView() {
  return (
    <>
      <ContactHero />

      {/* <Container sx={{ py: 10 }}>
        <Box
          gap={10}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        >
          <ContactForm />

          <ContactMap contacts={_mapContact} />
        </Box>
      </Container> */}
    </>
  );
}

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface WelcomeEmailProps {
  name: string
  organizationName?: string
}

export function WelcomeEmail({ name, organizationName }: WelcomeEmailProps) {
  const appName = organizationName ? `${organizationName} on TalentOS` : 'TalentOS'

  return (
    <Html>
      <Head />
      <Preview>Welcome to {appName}!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to {appName}!</Heading>
          <Text style={text}>Hi {name},</Text>
          <Text style={text}>
            We're excited to have you on board! Your account has been set up and you're ready to
            get started.
          </Text>
          <Section style={buttonContainer}>
            <Link style={button} href={process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}>
              Go to Dashboard
            </Link>
          </Section>
          <Text style={text}>
            If you have any questions or need help getting started, don't hesitate to reach out to
            your administrator.
          </Text>
          <Text style={footer}>Welcome aboard!</Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#f5f5f5',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '560px',
}

const h1 = {
  color: '#111',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
}

const text = {
  color: '#666',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
}

const buttonContainer = {
  padding: '27px 0',
}

const button = {
  backgroundColor: '#6366f1',
  borderRadius: '6px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px 24px',
}

const footer = {
  color: '#999',
  fontSize: '14px',
  lineHeight: '22px',
  marginTop: '32px',
}

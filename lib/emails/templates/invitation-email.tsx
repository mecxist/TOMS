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
import { UserRole } from '@prisma/client'

interface InvitationEmailProps {
  organizationName: string
  inviterName: string
  role: UserRole
  acceptUrl: string
}

const roleLabels: Record<UserRole, string> = {
  ADMIN: 'Administrator',
  MANAGER: 'Manager',
  COORDINATOR: 'Coordinator',
  TALENT: 'Talent',
}

export function InvitationEmail({
  organizationName,
  inviterName,
  role,
  acceptUrl,
}: InvitationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>You've been invited to join {organizationName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>You've been invited!</Heading>
          <Text style={text}>
            {inviterName} has invited you to join <strong>{organizationName}</strong> as a{' '}
            <strong>{roleLabels[role]}</strong>.
          </Text>
          <Section style={buttonContainer}>
            <Link style={button} href={acceptUrl}>
              Accept Invitation
            </Link>
          </Section>
          <Text style={text}>
            Or copy and paste this URL into your browser:{' '}
            <Link href={acceptUrl} style={link}>
              {acceptUrl}
            </Link>
          </Text>
          <Text style={footer}>
            This invitation will expire in 7 days. If you didn't expect this invitation, you can
            safely ignore this email.
          </Text>
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

const link = {
  color: '#6366f1',
  textDecoration: 'underline',
}

const footer = {
  color: '#999',
  fontSize: '14px',
  lineHeight: '22px',
  marginTop: '32px',
}

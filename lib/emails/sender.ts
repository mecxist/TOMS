import { Resend } from 'resend'
import { UserRole } from '@prisma/client'
import { InvitationEmail } from './templates/invitation-email'
import { VerificationEmail } from './templates/verification-email'
import { PasswordResetEmail } from './templates/password-reset-email'
import { WelcomeEmail } from './templates/welcome-email'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@talentos.com'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export interface InvitationEmailData {
  email: string
  token: string
  organizationName: string
  inviterName: string
  role: UserRole
}

export interface VerificationEmailData {
  email: string
  token: string
  name?: string
}

export interface PasswordResetEmailData {
  email: string
  token: string
  name?: string
}

export interface WelcomeEmailData {
  email: string
  name: string
  organizationName?: string
}

/**
 * Send invitation email
 */
export async function sendInvitationEmail(data: InvitationEmailData) {
  const acceptUrl = `${APP_URL}/accept-invitation/${data.token}`

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: `You've been invited to join ${data.organizationName}`,
      react: InvitationEmail({
        organizationName: data.organizationName,
        inviterName: data.inviterName,
        role: data.role,
        acceptUrl,
      }),
    })

    if (error) {
      console.error('Failed to send invitation email:', error)
      throw new Error('Failed to send invitation email')
    }
  } catch (error) {
    console.error('Error sending invitation email:', error)
    throw error
  }
}

/**
 * Send verification email
 */
export async function sendVerificationEmail(data: VerificationEmailData) {
  const verifyUrl = `${APP_URL}/verify-email?token=${data.token}`

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: 'Verify your email address',
      react: VerificationEmail({
        name: data.name,
        verifyUrl,
      }),
    })

    if (error) {
      console.error('Failed to send verification email:', error)
      throw new Error('Failed to send verification email')
    }
  } catch (error) {
    console.error('Error sending verification email:', error)
    throw error
  }
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(data: PasswordResetEmailData) {
  const resetUrl = `${APP_URL}/reset-password?token=${data.token}`

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: 'Reset your password',
      react: PasswordResetEmail({
        name: data.name,
        resetUrl,
      }),
    })

    if (error) {
      console.error('Failed to send password reset email:', error)
      throw new Error('Failed to send password reset email')
    }
  } catch (error) {
    console.error('Error sending password reset email:', error)
    throw error
  }
}

/**
 * Send welcome email
 */
export async function sendWelcomeEmail(data: WelcomeEmailData) {
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: `Welcome to ${data.organizationName || 'TalentOS'}!`,
      react: WelcomeEmail({
        name: data.name,
        organizationName: data.organizationName,
      }),
    })

    if (error) {
      console.error('Failed to send welcome email:', error)
      throw new Error('Failed to send welcome email')
    }
  } catch (error) {
    console.error('Error sending welcome email:', error)
    throw error
  }
}

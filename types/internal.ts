import React from 'react';
import { InstagramEmbedProps, TwitterEmbedProps } from 'react-social-media-embed';

export enum PostType {
  Positive = 'positive',
  Negative = 'negative',
}

export enum Intent {
  Share = 'share',
  Report = 'report',
}

export enum Platform {
  Twitter = 'twitter',
  Instagram = 'instagram',
  Facebook = 'facebook',
  TikTok = 'tiktok',
}

export type PostResponse = {
  url: string;
  created: string;
};

export type SocialMediaEmbedProps = InstagramEmbedProps | TwitterEmbedProps;

export interface BaseIntentConfig {
  primaryAction: () => void;
}

export interface TutorialIntentConfig extends BaseIntentConfig {
  hasTutorial: true;
  tutorialDialogOnSubmit: () => void;
  tutorialDialogContent: React.ReactNode;
}

export interface NoTutorialIntentConfig extends BaseIntentConfig {
  hasTutorial: false;
}

export type IntentConfig = TutorialIntentConfig | NoTutorialIntentConfig;

export interface PlatformConfig {
  [Intent.Share]: IntentConfig;
  [Intent.Report]: IntentConfig;
}

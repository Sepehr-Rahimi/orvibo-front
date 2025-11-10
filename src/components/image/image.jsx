'use client';

import { forwardRef } from 'react';
import NextImage from 'next/image';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { CONFIG } from 'src/config-global';

import { imageClasses } from './classes';

// ----------------------------------------------------------------------

const ImageWrapper = styled(Box)({
  overflow: 'hidden',
  position: 'relative',
  verticalAlign: 'bottom',
  display: 'inline-block',
  [`& .${imageClasses.wrapper}`]: {
    width: '100%',
    height: '100%',
    verticalAlign: 'bottom',
    backgroundSize: 'cover !important',
  },
});

const Overlay = styled('span')({
  top: 0,
  left: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
});

// ----------------------------------------------------------------------

export const Image = forwardRef(
  (
    { ratio, disabledEffect = false, alt, src, slotProps, sx, priority, width, height, ...other },
    ref
  ) => {
    // Next.js Image requires width/height OR fill
    const content = (
      <NextImage
        // width={width || 500}
        // height={height || 500}
        src={src}
        alt={alt}
        // fill={isFilled} // fill when using ratio
        fill={!!ratio}
        width={!ratio && 500}
        height={!ratio && 500}
        priority={priority || false} // let caller set priority for LCP
        sizes="100vw"
        placeholder={disabledEffect ? 'empty' : 'blur'}
        blurDataURL={`${CONFIG.site.basePath}/assets/placeholder.svg`}
        style={{
          objectFit: 'cover',
          // aspectRatio: ratio,
        }}
        className={imageClasses.wrapper}
      />
    );

    return (
      <ImageWrapper
        ref={ref}
        component="span"
        className={imageClasses.root}
        sx={{ ...(!!ratio && { width: 1, aspectRatio: ratio }), ...sx }}
        {...other}
      >
        {slotProps?.overlay && <Overlay className={imageClasses.overlay} sx={slotProps?.overlay} />}
        {content}
      </ImageWrapper>
    );
  }
);

Image.displayName = 'Image';

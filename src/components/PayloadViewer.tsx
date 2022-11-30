import React, {useMemo} from 'react';
import { JwtPayload, JwtPayloadObjectValue, JwtPayloadValue } from '../samples';

import Tooltip from './Tooltip';

import './PayloadViewer.css';

interface Props {
  payload: JwtPayload
  className?: string
}
export default function PayloadViewer(props: Props) {
  const keys = useMemo(() => Object.keys(props.payload), [props.payload]);

  return (
    <div className={`criipto-jwt-viewer-payload ${props.className || ''}`}>
      &#123;<br />
      {keys.map((key, index) => <Claim key={key} claim={key} payload={props.payload} level={1} last={index === keys.length - 1} />)}
      &#125;<br />
      {/* for debugging: <pre>
        {JSON.stringify(props.payload, null, 2)}
      </pre> */}
    </div>
  );
}

interface ClaimProps {
  claim: string
  payload: JwtPayload | JwtPayloadObjectValue
  level: number
  last: boolean
}

function Claim(props: ClaimProps) {
  const value = props.payload[props.claim];
  const keys = useMemo(() => value && typeof value === "object" ? Object.keys(value) : null, [value]);

  if (value && typeof value === 'object') {
    return (
      <div style={{marginLeft: props.level * 15}}>
        <div className="criipto-jwt-viewer-claim">
          "{props.claim}": &#123;<br />
          {keys!.map((key, index) => <Claim key={key} claim={key} payload={value} level={props.level + 1} last={index === keys!.length - 1} />)}
          &#125;{props.last ? null : ','}<br />
          <ClaimTooltip claim={props.claim} payload={props.payload} />
        </div>
      </div>
    );
  }

  return (
    <div style={{marginLeft: props.level * 15}}>
      <div className="criipto-jwt-viewer-claim">
        "{props.claim}": {JSON.stringify(props.payload[props.claim])}{props.last ? null : ','}
        <ClaimTooltip claim={props.claim} payload={props.payload} />
      </div>
    </div>
  );
}

interface ClaimTooltipProps {
  claim: string
  payload: JwtPayload | JwtPayloadObjectValue
}
function ClaimTooltip(props: ClaimTooltipProps) {
  const {claim} = props;
  let tooltip : string | null = null;

  if (claim === 'iss') tooltip = 'Your Criipto domain';
  if (claim === 'aud') tooltip = 'ClientID/Realm of your Criipto Application';
  if (claim === 'iat') tooltip = 'Issued at (seconds since Unix epoch)';
  if (claim === 'nbf') tooltip = 'Not valid before (seconds since Unix epoch)';
  if (claim === 'exp') tooltip = 'Expiration time (seconds since Unix epoch)';
  if (claim === 'identityscheme') tooltip = 'Overall eID used to authenticate';
  if (claim === 'nameidentifier') tooltip = `Legacy format of 'sub'`;
  if (claim === 'sub') tooltip = `Persistent pseudonym. Uniquely identifies an eID user`;
  if (claim === 'authenticationtype') tooltip = `acr_values used to authenticate`;
  if (claim === 'address') tooltip = "An OpenID Connect standard address claim"

  if (!tooltip) return null;
  return <Tooltip tooltip={tooltip} />
}
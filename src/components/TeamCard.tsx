import { useEffect, useState } from 'react';
import { getTeamPhotoUrl } from '../services/teamService';
import type { TeamMember } from '../types/content';

function LinkedInIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 3.5a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2ZM3.4 9h3.7v11.5H3.4V9Zm6 0h3.5v1.6h.1c.5-.9 1.7-2 3.6-2 3.9 0 4.6 2.5 4.6 5.9v6H17.5v-5.3c0-1.3 0-3-1.9-3s-2.2 1.5-2.2 2.9v5.4H9.6V9Z" /></svg>;
}

export function TeamCard({ member }: { member: TeamMember }) {
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(member.photoUrl);
  const [imageFailed, setImageFailed] = useState(false);
  const initials = member.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  useEffect(() => {
    setImageFailed(false);
    getTeamPhotoUrl(member).then(setPhotoUrl);
  }, [member]);

  return (
    <article className="team-card">
      <div className="team-avatar-wrap">
        {photoUrl && !imageFailed ? (
          <img
            src={photoUrl}
            alt={`Portrait of ${member.name}`}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div
            className="team-avatar-initials"
            aria-label={`Portrait not yet available for ${member.name}`}
          >
            {initials}
          </div>
        )}
      </div>
      <div className="team-card-content">
        <div className="team-role">{member.role}</div>
        <h3>{member.name}</h3>
        {member.bio && <p>{member.bio}</p>}
        {member.linkedinUrl && (
          <a
            className="linkedin-button"
            href={member.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon />
            LinkedIn Profile
          </a>
        )}
      </div>
    </article>
  );
}

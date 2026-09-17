import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { fallbackTeamMembers } from '../data/fallbackContent';
import { db, isFirebaseConfigured, storage } from '../firebase/firebase';
import type { ContentResult, TeamMember } from '../types/content';

const fallbackWarning = 'Previewing local fallback team data because Firebase could not be loaded.';

function toTeamMember(id: string, value: Record<string, unknown>): TeamMember {
  return {
    id,
    name: typeof value.name === 'string' ? value.name : 'Team member',
    role: typeof value.role === 'string' ? value.role : 'Role to be added',
    bio: typeof value.bio === 'string' ? value.bio : undefined,
    photoUrl: typeof value.photoUrl === 'string' ? value.photoUrl : undefined,
    photoPath: typeof value.photoPath === 'string' ? value.photoPath : undefined,
    linkedinUrl: typeof value.linkedinUrl === 'string' ? value.linkedinUrl : undefined,
    displayOrder: typeof value.displayOrder === 'number' ? value.displayOrder : Number.MAX_SAFE_INTEGER,
    active: value.active === true,
  };
}

export async function getTeamMembers(): Promise<ContentResult<TeamMember[]>> {
  if (!isFirebaseConfigured || !db) {
    return { data: fallbackTeamMembers, source: 'local', warning: fallbackWarning };
  }

  try {
    const membersQuery = query(
      collection(db, 'teamMembers'),
      where('active', '==', true),
      orderBy('displayOrder', 'asc'),
    );
    const snapshot = await getDocs(membersQuery);
    const members = snapshot.docs
      .map((entry) => toTeamMember(entry.id, entry.data()))
      .filter((member) => member.active)
      .sort((first, second) => first.displayOrder - second.displayOrder);
    return { data: members, source: 'firebase' };
  } catch {
    return { data: fallbackTeamMembers, source: 'local', warning: fallbackWarning };
  }
}

export async function getTeamPhotoUrl(member: TeamMember): Promise<string | undefined> {
  if (member.photoUrl) return member.photoUrl;
  if (!member.photoPath || !storage) return undefined;

  try {
    return await getDownloadURL(ref(storage, member.photoPath));
  } catch {
    return undefined;
  }
}

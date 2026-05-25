'use client';

import { useRole } from '@/app/context/role-context';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Suspense } from 'react';

interface Learner {
  id: string;
  name: string;
}

function RoleSwitcherContent() {
  const { role, selectedLearnerId, setRole, setSelectedLearnerId } = useRole();
  const [learners, setLearners] = useState<Learner[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Fetch learners list
    fetch('/api/learners')
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.error || 'Failed to fetch learners');
        }
        return data;
      })
      .then(data => setLearners(Array.isArray(data) ? data : []))
      .catch(err => console.error('[v0] Failed to fetch learners:', err));
  }, []);

  const selectedLearner = learners.find(l => l.id === selectedLearnerId);

  return (
    <div className="flex gap-2 items-center">
      {role === 'admin' ? (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setRole('learner');
            if (learners.length > 0) {
              setSelectedLearnerId(learners[0].id);
            }
          }}
        >
          Switch to Learner
        </Button>
      ) : (
        <>
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="gap-2"
            >
              {selectedLearner?.name || 'Select Learner'}
              <ChevronDown className="w-4 h-4" />
            </Button>
            {isOpen && (
              <div className="absolute top-full mt-1 left-0 bg-background border rounded-lg shadow-lg z-50 min-w-[180px]">
                {learners.map(learner => (
                  <button
                    key={learner.id}
                    onClick={() => {
                      setSelectedLearnerId(learner.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-accent/10 transition-colors ${
                      selectedLearnerId === learner.id ? 'bg-accent/20 text-accent' : ''
                    }`}
                  >
                    {learner.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setRole('admin');
              setSelectedLearnerId(null);
            }}
          >
            Back to Admin
          </Button>
        </>
      )}
    </div>
  );
}

export function RoleSwitcher() {
  return (
    <Suspense fallback={<div className="w-40 h-9" />}>
      <RoleSwitcherContent />
    </Suspense>
  );
}

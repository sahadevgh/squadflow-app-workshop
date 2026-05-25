'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Database, Server, Globe } from 'lucide-react';

export function SystemDiagram() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>SquadFlow System Architecture</CardTitle>
          <CardDescription>
            Understanding how data flows through the application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Architecture Diagram */}
          <div className="space-y-6">
            <div className="flex flex-col gap-3">
              {/* User Interface Layer */}
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100">
                    <Globe className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">Frontend (Next.js)</h4>
                  <p className="text-sm text-muted-foreground">React components on port 3000</p>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowRight className="h-5 w-5 text-gray-400 rotate-90" />
              </div>

              {/* API Layer */}
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-green-100">
                    <Server className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">REST API (Express.js)</h4>
                  <p className="text-sm text-muted-foreground">Backend server on port 5000</p>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowRight className="h-5 w-5 text-gray-400 rotate-90" />
              </div>

              {/* Data Storage Layer */}
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-purple-100">
                    <Database className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">Data Storage (File-based JSON)</h4>
                  <p className="text-sm text-muted-foreground">server/data.json - Easy to inspect</p>
                </div>
              </div>
            </div>

            {/* Data Flow Example */}
            <div className="border-t pt-6">
              <h4 className="font-semibold mb-4">Example Data Flow: Creating a Task</h4>
              <div className="space-y-3 text-sm">
                <div className="bg-blue-50 rounded p-3">
                  <p className="font-medium text-blue-900">1. User fills form in browser</p>
                  <p className="text-blue-700">Task form component collects title, description, etc.</p>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="h-4 w-4 text-gray-400 rotate-90" />
                </div>

                <div className="bg-green-50 rounded p-3">
                  <p className="font-medium text-green-900">2. Frontend sends POST request</p>
                  <p className="text-green-700">api-client.ts sends JSON to http://localhost:8000/api/tasks</p>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="h-4 w-4 text-gray-400 rotate-90" />
                </div>

                <div className="bg-purple-50 rounded p-3">
                  <p className="font-medium text-purple-900">3. Backend processes request</p>
                  <p className="text-purple-700">Express route handler validates data and creates task</p>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="h-4 w-4 text-gray-400 rotate-90" />
                </div>

                <div className="bg-amber-50 rounded p-3">
                  <p className="font-medium text-amber-900">4. Data is persisted</p>
                  <p className="text-amber-700">db.ts saves task to server/data.json file</p>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="h-4 w-4 text-gray-400 rotate-90" />
                </div>

                <div className="bg-blue-50 rounded p-3">
                  <p className="font-medium text-blue-900">5. Response returned to frontend</p>
                  <p className="text-blue-700">Frontend receives new task and updates UI</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Concepts */}
          <div className="border-t pt-6">
            <h4 className="font-semibold mb-4">Key Concepts</h4>
            <div className="grid gap-3 text-sm">
              <div>
                <p className="font-medium">REST API</p>
                <p className="text-muted-foreground">Uses HTTP methods (GET, POST, PUT, DELETE) to perform operations on resources</p>
              </div>
              <div>
                <p className="font-medium">Client-Server Architecture</p>
                <p className="text-muted-foreground">Frontend and backend are separate, communicating via HTTP requests</p>
              </div>
              <div>
                <p className="font-medium">JSON Data Format</p>
                <p className="text-muted-foreground">Structured text format for exchanging data between systems</p>
              </div>
              <div>
                <p className="font-medium">File-Based Storage</p>
                <p className="text-muted-foreground">Data is stored in server/data.json - inspect it to understand the database structure</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

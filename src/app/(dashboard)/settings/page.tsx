"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <>
      <Header title="Settings" />
      <div className="p-6">
        <Card>
          <CardContent className="p-12 text-center">
            <Settings className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h2 className="mt-4 text-lg font-semibold">System Settings</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Configure system preferences, integrations, and advanced options.
            </p>
            <Button variant="outline" className="mt-4">Coming Soon</Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

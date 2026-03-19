"use client";

import { Button, Card, Switch, Label } from "@heroui/react";

export function ComponentsDemo() {
  return (
    <section className="mb-12 sm:mb-16">
      <h2 className="mb-6 text-2xl font-semibold sm:mb-8">HeroUI Components</h2>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <Card.Header>
            <Card.Title>Button Variants</Card.Title>
            <Card.Description>
              All button variants with the earth-tone theme
            </Card.Description>
          </Card.Header>
          <Card.Content className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="tertiary">Tertiary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" isDisabled>Disabled</Button>
              <Button variant="primary" isPending>Loading</Button>
            </div>
          </Card.Content>
        </Card>

        <Card className="p-6">
          <Card.Header>
            <Card.Title>Switch Components</Card.Title>
            <Card.Description>
              Toggle switches with smooth animations
            </Card.Description>
          </Card.Header>
          <Card.Content className="space-y-4">
            <div className="flex items-center gap-4">
              <Switch defaultSelected>
                <Label>Notifications</Label>
              </Switch>
            </div>
            <div className="flex items-center gap-4">
              <Switch>
                <Label>Dark Mode</Label>
              </Switch>
            </div>
            <div className="flex items-center gap-4">
              <Switch defaultSelected size="sm">
                <Label>Small Switch</Label>
              </Switch>
            </div>
            <div className="flex items-center gap-4">
              <Switch isDisabled>
                <Label>Disabled</Label>
              </Switch>
            </div>
          </Card.Content>
        </Card>

        <Card className="p-6">
          <Card.Header>
            <Card.Title>Typography</Card.Title>
            <Card.Description>
              Text styles with the custom color palette
            </Card.Description>
          </Card.Header>
          <Card.Content className="space-y-3">
            <p className="text-4xl font-bold">Heading 1</p>
            <p className="text-3xl font-semibold">Heading 2</p>
            <p className="text-2xl font-medium">Heading 3</p>
            <p className="text-xl">Heading 4</p>
            <p className="text-base">Body text with regular weight</p>
            <p className="text-sm text-muted">
              Secondary text with muted color
            </p>
            <p className="text-xs text-muted">
              Caption text for small details
            </p>
          </Card.Content>
        </Card>

        <Card className="p-6">
          <Card.Header>
            <Card.Title>Interactive States</Card.Title>
            <Card.Description>
              Hover, focus, and active state demonstrations
            </Card.Description>
          </Card.Header>
          <Card.Content className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-default p-4 transition-all duration-200 hover:bg-[var(--stone-200)] dark:hover:bg-[var(--stone-700)]">
                <p className="font-medium">Hover Me</p>
                <p className="text-sm text-muted">Background changes</p>
              </div>
              <button className="rounded-lg bg-accent p-4 text-left text-accent-foreground transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background active:scale-95">
                <p className="font-medium">Click Me</p>
                <p className="text-sm opacity-80">Focus & active states</p>
              </button>
            </div>
            <div className="flex gap-3">
              <Button
                variant="primary"
                onPress={() => alert("Button pressed!")}
              >
                Press Event
              </Button>
              <Button
                variant="secondary"
                onPress={() => console.log("Logged to console")}
              >
                Console Log
              </Button>
            </div>
          </Card.Content>
        </Card>
      </div>

      <div className="mt-8 rounded-2xl bg-surface p-6 shadow-surface sm:p-8">
        <h3 className="mb-4 text-xl font-semibold">Animation & Transitions</h3>
        <p className="mb-6 text-muted">
          All components use smooth, optimized transitions with the following
          easing functions:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <code className="text-sm text-accent">ease-smooth</code>
            <div className="h-2 rounded-full bg-default">
              <div className="h-full w-1/2 rounded-full bg-accent transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:w-full" />
            </div>
          </div>
          <div className="space-y-2">
            <code className="text-sm text-accent">ease-out-quart</code>
            <div className="h-2 rounded-full bg-default">
              <div className="h-full w-1/2 rounded-full bg-success transition-all duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:w-full" />
            </div>
          </div>
          <div className="space-y-2">
            <code className="text-sm text-accent">ease-out-fluid</code>
            <div className="h-2 rounded-full bg-default">
              <div className="h-full w-1/2 rounded-full bg-warning transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:w-full" />
            </div>
          </div>
          <div className="space-y-2">
            <code className="text-sm text-accent">linear</code>
            <div className="h-2 rounded-full bg-default">
              <div className="h-full w-1/2 rounded-full bg-danger transition-all duration-500 ease-linear hover:w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

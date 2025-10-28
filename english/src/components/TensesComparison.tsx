'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TenseFormula } from '@/types/tenses';
import { TensesData } from '@/utils/tenses-data';

interface TensesComparisonProps {
  tense1: TenseFormula;
  tense2: TenseFormula;
}

export default function TensesComparison({ tense1, tense2 }: TensesComparisonProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>{tense1.name}</CardTitle>
          <CardDescription>{tense1.nameVN}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Badge variant="outline" className="mb-2">Dấu hiệu</Badge>
            <div className="flex flex-wrap gap-1">
              {tense1.timeSignals.map((signal) => (
                <Badge key={signal} variant="secondary" className="text-xs">
                  {signal}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <Badge variant="outline" className="mb-2">Mục đích</Badge>
            <p className="text-sm text-muted-foreground">{tense1.usage}</p>
          </div>
          <div>
            <Badge variant="outline" className="mb-2">Ví dụ</Badge>
            <ul className="text-sm space-y-1">
              {tense1.examples.affirmative.map((ex, i) => (
                <li key={i}>• {ex}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{tense2.name}</CardTitle>
          <CardDescription>{tense2.nameVN}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Badge variant="outline" className="mb-2">Dấu hiệu</Badge>
            <div className="flex flex-wrap gap-1">
              {tense2.timeSignals.map((signal) => (
                <Badge key={signal} variant="secondary" className="text-xs">
                  {signal}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <Badge variant="outline" className="mb-2">Mục đích</Badge>
            <p className="text-sm text-muted-foreground">{tense2.usage}</p>
          </div>
          <div>
            <Badge variant="outline" className="mb-2">Ví dụ</Badge>
            <ul className="text-sm space-y-1">
              {tense2.examples.affirmative.map((ex, i) => (
                <li key={i}>• {ex}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function AllTensesComparison() {
  const tensesByGroup = TensesData.getTensesByGroup();

  return (
    <Tabs defaultValue="present" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="present">Hiện tại (4)</TabsTrigger>
        <TabsTrigger value="past">Quá khứ (4)</TabsTrigger>
        <TabsTrigger value="future">Tương lai (4)</TabsTrigger>
      </TabsList>

      <TabsContent value="present" className="space-y-4 mt-4">
        <div className="grid md:grid-cols-2 gap-4">
          {tensesByGroup.present.map((tense) => (
            <Card key={tense.id}>
              <CardHeader>
                <CardTitle className="text-lg">{tense.nameVN}</CardTitle>
                <CardDescription>{tense.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-sm font-semibold mb-1">Công thức:</div>
                  <div className="text-sm bg-muted p-2 rounded">
                    {tense.affirmative}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold mb-1">Dấu hiệu:</div>
                  <div className="flex flex-wrap gap-1">
                    {tense.timeSignals.map((signal) => (
                      <Badge key={signal} variant="secondary" className="text-xs">
                        {signal}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold mb-1">Mục đích:</div>
                  <p className="text-sm text-muted-foreground">{tense.usage}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="past" className="space-y-4 mt-4">
        <div className="grid md:grid-cols-2 gap-4">
          {tensesByGroup.past.map((tense) => (
            <Card key={tense.id}>
              <CardHeader>
                <CardTitle className="text-lg">{tense.nameVN}</CardTitle>
                <CardDescription>{tense.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-sm font-semibold mb-1">Công thức:</div>
                  <div className="text-sm bg-muted p-2 rounded">
                    {tense.affirmative}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold mb-1">Dấu hiệu:</div>
                  <div className="flex flex-wrap gap-1">
                    {tense.timeSignals.map((signal) => (
                      <Badge key={signal} variant="secondary" className="text-xs">
                        {signal}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold mb-1">Mục đích:</div>
                  <p className="text-sm text-muted-foreground">{tense.usage}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="future" className="space-y-4 mt-4">
        <div className="grid md:grid-cols-2 gap-4">
          {tensesByGroup.future.map((tense) => (
            <Card key={tense.id}>
              <CardHeader>
                <CardTitle className="text-lg">{tense.nameVN}</CardTitle>
                <CardDescription>{tense.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-sm font-semibold mb-1">Công thức:</div>
                  <div className="text-sm bg-muted p-2 rounded">
                    {tense.affirmative}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold mb-1">Dấu hiệu:</div>
                  <div className="flex flex-wrap gap-1">
                    {tense.timeSignals.map((signal) => (
                      <Badge key={signal} variant="secondary" className="text-xs">
                        {signal}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold mb-1">Mục đích:</div>
                  <p className="text-sm text-muted-foreground">{tense.usage}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}


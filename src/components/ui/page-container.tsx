export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-6 p-6">{children}</div>;
};

export const PageHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full flex-col items-center justify-between sm:flex-row">
      {children}
    </div>
  );
};

export const PageHeaderContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="mb-1 space-y-1 sm:mb-0">{children}</div>;
};

export const PageTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className="text-center text-2xl font-bold sm:text-left">{children}</h1>
  );
};

export const PageDescription = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <p className="text-muted-foreground text-sm">{children}</p>;
};

export const PageActions = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center gap-2 sm:flex-row">
      {children}
    </div>
  );
};

export const PageContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-6">{children}</div>;
};

import test from "@playwright/test";

/**
 * Decorator function for logging method calls
 * @param target - The function being decorated
 * @param context - Additional context information
 * @returns A wrapped function that logs before calling the original function
 */
export function step<This, Args extends any[], Return>(
  target: (this: This, ...args: Args) => Promise<Return> | Return,
  context: ClassMethodDecoratorContext<
    This,
    (this: This, ...args: Args) => Promise<Return> | Return
  >,
): ((this: This, ...args: Args) => Promise<any>) | undefined {
  if (context.kind !== "method") return;

  async function replacementMethod(this: This, ...args: Args): Promise<any> {
    const info = target.name
      .split(/(?=[A-Z])/)
      .map((word) => word.toUpperCase())
      .join(" ");

    const result = new Promise<any>((resolve, reject) => {
      test
        .step(`🟢 ${info}`, async () => {
          const result = await target.call(this, ...args);
          console.log(`✅ ${info}`);
          resolve(result);
        })
        .catch((error) => {
          console.error(`🔴 ${info}`);
          console.error(`❌ ${error}`);
          reject(error);
        });
    });

    return await result;
  }

  return replacementMethod;
}

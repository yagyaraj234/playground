#include <iostream>
using namespace std;

void BubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        // optimization: stop if no swaps occurred
        if (!swapped) break;
    }
}

int main() {
    int arr[] = {34894, 42, 5, 2, 53, 2, 7, 23, 6, 2, 25, 0};
    int n = sizeof(arr) / sizeof(arr[0]);

    cout << "Before sorting:\n";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;

    BubbleSort(arr, n);

    cout << "After sorting:\n";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;

    return 0;
}

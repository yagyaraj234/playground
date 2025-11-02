#include<iostream>
using namespace std;

int main(){
    const int n = 9;
    int a[n] = {4, 5, 35, 2, 553, 5, 2, 5, 3};

    for (int i = 0; i < n; i++){
        cout << " "<< a[i];
    }

    for (int i = 0; i < n-1;i++){
        int currentIndex = i ;
        for (int j = i + 1; j < n;j++){
            if(a[currentIndex]> a[j]){
                swap(a[currentIndex], a[j]);
            }
        }
    }

    cout << endl;
    for (int i = 0; i < n; i++)
    {
        cout << " "<< a[i];
    }

        return 0;
}